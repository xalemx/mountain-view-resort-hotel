import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import {
  MAX_GUEST_CONFIRMATION_ATTEMPTS,
  MAX_NOTIFICATION_ATTEMPTS,
  NOTIFICATION_WINDOW_DAYS,
  SEND_LEASE_MS,
  sendGuestConfirmation,
  sendHostNotification,
} from '../../shared/enquiryNotifications.ts';

const PAGE_SIZE = 20;
const MAX_ROWS_PER_RUN = 40;
const CHUNK_SIZE = 3;

// Sweeps up host alerts, and guests' copies, that were never accepted for
// delivery. Runs from a scheduled workflow, so it carries the same admin check
// as the alerts themselves.
export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403 });

    const now = Date.now();
    const cutoff = new Date(now - NOTIFICATION_WINDOW_DAYS * 86400000).toISOString();
    const stale = new Date(now - SEND_LEASE_MS).toISOString();

    // The seven-day cutoff belongs in the query, not in a filter applied to the
    // page that comes back: otherwise failures older than the window fill every
    // batch and the recent ones are never reached. Pages are followed to the end
    // of the eligible set, up to a per-run ceiling, and each page is collected
    // before anything is sent so the cursor never shifts under the sweep.
    const collect = async (query: Record<string, unknown>) => {
      const rows: any[] = [];
      let cursor: string | undefined;
      for (;;) {
        const page = await base44.asServiceRole.entities.Enquiry.filter(query, {
          sort: 'created_date',
          limit: PAGE_SIZE,
          ...(cursor ? { cursor } : {}),
        });
        const items = page?.items || [];
        rows.push(...items);
        cursor = page?.next_cursor;
        if (!items.length || !page?.has_more || !cursor || rows.length >= MAX_ROWS_PER_RUN) break;
      }
      return rows.slice(0, MAX_ROWS_PER_RUN);
    };

    // A row still marked as being sent is picked up once its worker's lease has
    // run out, so a send that died halfway is retried instead of being stranded.
    const hostRows = await collect({
      $or: [
        {
          notification_status: { $in: ['pending', 'failed'] },
          notification_attempts: { $lt: MAX_NOTIFICATION_ATTEMPTS },
        },
        { notification_status: 'sending', notification_claimed_at: { $lt: stale } },
      ],
      created_date: { $gte: cutoff },
    });

    const guestRows = await collect({
      reply_method: 'email',
      $or: [
        {
          guest_confirmation_status: { $in: ['pending', 'failed'] },
          guest_confirmation_attempts: { $lt: MAX_GUEST_CONFIRMATION_ATTEMPTS },
        },
        { guest_confirmation_status: 'sending', guest_confirmation_claimed_at: { $lt: stale } },
      ],
      created_date: { $gte: cutoff },
    });

    const run = async (rows: any[], send: (client: any, row: any) => Promise<any>) => {
      const outcomes: any[] = [];
      for (let start = 0; start < rows.length; start += CHUNK_SIZE) {
        const chunk = rows.slice(start, start + CHUNK_SIZE);
        const results = await Promise.allSettled(chunk.map((row) => send(base44, row)));
        results.forEach((result, index) => {
          const outcome =
            result.status === 'fulfilled' ? result.value : { sent: false, error: String(result.reason) };
          outcomes.push({ enquiry_id: chunk[index].id, ...outcome });
        });
      }
      return {
        checked: outcomes.length,
        sent: outcomes.filter((row) => row.sent).length,
        failed: outcomes.filter((row) => !row.sent && !row.skipped).length,
        skipped: outcomes.filter((row) => row.skipped).length,
        outcomes,
      };
    };

    const host = await run(hostRows, sendHostNotification);
    const guest = await run(guestRows, sendGuestConfirmation);

    return Response.json({
      // The top-level counts describe the host alert, which is what this sweep
      // was originally for; each email is also reported on its own.
      checked: host.checked,
      sent: host.sent,
      failed: host.failed,
      skipped: host.skipped,
      host,
      guest,
      outcomes: host.outcomes,
    });
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}