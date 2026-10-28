import test from "node:test";
import assert from "node:assert/strict";
import { MAX_LENGTHS, cleanCount, cleanEmail, cleanText } from "../base44/shared/enquiryFields.ts";

test("markup and control characters never reach an email", () => {
  // What the cleaning guarantees is that no markup character survives into the
  // email and no line break can split it: the angle brackets go, the text stays.
  assert.equal(/[<>]/.test(cleanText("<b>Ana</b>", 60)), false);
  assert.equal(/[\u0000-\u001F\u007F]/.test(cleanText("a\u0000b\nc", 60)), false);
  assert.equal(cleanText("line\nbreak", 60), "line break");
  assert.equal(cleanText("  spaced   out  ", 60), "spaced out");
  assert.equal(cleanText(null, 60), "");
  assert.equal(cleanText(42, 60), "");
});

test("lengths are capped at the shared limits", () => {
  assert.equal(cleanText("x".repeat(2000), MAX_LENGTHS.notes).length, MAX_LENGTHS.notes);
  assert.equal(cleanText("x".repeat(200), MAX_LENGTHS.name).length, MAX_LENGTHS.name);
});

test("only a real address survives", () => {
  assert.equal(cleanEmail("ana@example.com"), "ana@example.com");
  assert.equal(cleanEmail("  ana@example.com  "), "ana@example.com");
  assert.equal(cleanEmail("ana@example"), "");
  assert.equal(cleanEmail("a@b<script>"), "");
  assert.equal(cleanEmail(undefined), "");
});

test("guest counts are whole numbers, capped and never invented", () => {
  assert.equal(cleanCount("3", 50), 3);
  assert.equal(cleanCount(3.9, 50), 3);
  assert.equal(cleanCount("999", 50), 50, "over the range is capped, not invented");
  assert.ok(Number.isNaN(cleanCount("abc", 50)), "nonsense is not a count");
  assert.ok(Number.isNaN(cleanCount(-1, 50)));
});