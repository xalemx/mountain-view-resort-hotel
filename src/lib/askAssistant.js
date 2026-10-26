import { useEffect, useSyncExternalStore } from "react";
import { base44 } from "@/api/base44Client";

// One assistant for the whole site. The guest picks what they need, each choice
// talks to the specialist behind it, and the conversation is held outside React
// so moving between pages does not lose it.
//
// Privacy: the thread lives in sessionStorage only — this browser tab, this
// visit — and the panel offers to clear it. Nothing is written to localStorage.

export const TOPIC_KEYS = ["booking", "activities", "practical"];

const TOPIC_AGENTS = {
  booking: "booking_assistant",
  activities: "local_guide",
  practical: "concierge",
};

const STORAGE_KEY = "mountain-view-assistant";
const ANSWER_TIMEOUT_MS = 45000;

const blankThread = () => ({
  conversation: null,
  conversationId: null,
  messages: [],
  pending: false,
  error: "",
  askedAt: 0,
});

function readStored() {
  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : null;
    if (parsed && typeof parsed === "object" && parsed.threads) {
      return { topic: parsed.topic || null, threads: parsed.threads };
    }
  } catch (error) {
    // unreadable or unavailable storage: start fresh
  }
  return { topic: null, threads: {} };
}

let state = readStored();
const listeners = new Set();

function commit(next) {
  state = next;
  try {
    window.sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        topic: state.topic,
        threads: Object.fromEntries(
          Object.entries(state.threads).map(([agent, thread]) => [
            agent,
            {
              conversationId: thread.conversationId,
              conversation: thread.conversation,
              messages: thread.messages,
            },
          ])
        ),
      })
    );
  } catch (error) {
    // storage full or blocked: the conversation then lasts as long as the page
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function threadOf(agent) {
  return state.threads[agent] || blankThread();
}

function updateThread(agent, patch) {
  commit({ ...state, threads: { ...state.threads, [agent]: { ...threadOf(agent), ...patch } } });
}

// The platform's list can lag behind a message we have just sent, so keep any
// guest message it does not know about yet rather than dropping it on screen.
function mergeMessages(local, incoming) {
  if (!incoming.length) return local;
  const known = new Set(incoming.map((message) => `${message.role}:${(message.content || "").trim()}`));
  const notYetListed = local.filter(
    (message) => message.role === "user" && !known.has(`user:${(message.content || "").trim()}`)
  );
  return notYetListed.length ? [...incoming, ...notYetListed] : incoming;
}

function answered(messages) {
  const last = [...messages].reverse().find((message) => message.role !== "system");
  return Boolean(last && last.role !== "user");
}

function receive(agent, incoming) {
  const messages = mergeMessages(threadOf(agent).messages, incoming);
  updateThread(agent, {
    messages,
    pending: answered(messages) ? false : threadOf(agent).pending,
    error: answered(messages) ? "" : threadOf(agent).error,
  });
}

export function chooseTopic(topic) {
  if (!TOPIC_AGENTS[topic] || state.topic === topic) return;
  commit({ ...state, topic });
}

export function clearConversation() {
  commit({ ...state, threads: {} });
}

async function deliver(agent, content) {
  updateThread(agent, { pending: true, error: "", askedAt: Date.now() });

  try {
    let conversation = threadOf(agent).conversation;
    const conversationId = threadOf(agent).conversationId;

    if (!conversation && conversationId) {
      conversation = await base44.agents.getConversation(conversationId).catch(() => null);
    }
    if (!conversation) {
      conversation = await base44.agents.createConversation({
        agent_name: agent,
        metadata: { name: "Ask Mountain View" },
      });
    }

    updateThread(agent, {
      conversation,
      conversationId: conversation.id,
      messages: conversation.messages?.length ? conversation.messages : threadOf(agent).messages,
    });

    await base44.agents.addMessage(conversation, { role: "user", content });
  } catch (error) {
    // Forget the stored conversation object but keep its id, so the next
    // attempt reopens it from the server rather than failing the same way.
    updateThread(agent, { pending: false, error: "send", conversation: null });
  }
}

export async function sendMessage(text) {
  const content = text.trim();
  const agent = TOPIC_AGENTS[state.topic];
  if (!content || !agent) return;

  updateThread(agent, { messages: [...threadOf(agent).messages, { role: "user", content }] });
  await deliver(agent, content);
}

// Asking again: the guest's question is still on screen, so it is repeated to
// the assistant rather than shown twice.
export async function retryAnswer() {
  const agent = TOPIC_AGENTS[state.topic];
  if (!agent) return;

  const lastQuestion = [...threadOf(agent).messages].reverse().find((message) => message.role === "user");
  if (!lastQuestion) return;

  await deliver(agent, lastQuestion.content);
}

export function useAskAssistant(defaultTopic) {
  const snapshot = useSyncExternalStore(subscribe, () => state);
  const topic = snapshot.topic;
  const agent = TOPIC_AGENTS[topic] || null;
  const thread = agent ? threadOf(agent) : blankThread();

  // The page the guest arrived on sets the topic once; after that their own
  // choice is kept, so the conversation follows them around the site.
  useEffect(() => {
    if (!state.topic && TOPIC_AGENTS[defaultTopic]) chooseTopic(defaultTopic);
  }, [defaultTopic]);

  useEffect(() => {
    if (!thread.conversationId) return undefined;
    return base44.agents.subscribeToConversation(thread.conversationId, (data) => {
      receive(agent, data.messages || []);
    });
  }, [agent, thread.conversationId]);

  // Nothing sits on "thinking" for ever: an answer that has not arrived in time
  // becomes a plain message with the option to ask again.
  useEffect(() => {
    if (!thread.pending || !thread.askedAt) return undefined;

    const remaining = thread.askedAt + ANSWER_TIMEOUT_MS - Date.now();
    if (remaining <= 0) {
      updateThread(agent, { pending: false, error: "no_answer" });
      return undefined;
    }

    const timer = setTimeout(() => {
      if (threadOf(agent).pending) updateThread(agent, { pending: false, error: "no_answer" });
    }, remaining);

    return () => clearTimeout(timer);
  }, [agent, thread.pending, thread.askedAt]);

  return {
    topic,
    thread,
    chooseTopic,
    sendMessage,
    retryAnswer,
    clearConversation,
  };
}