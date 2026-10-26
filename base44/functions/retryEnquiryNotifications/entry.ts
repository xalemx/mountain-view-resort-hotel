import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import {
  MAX_NOTIFICATION_ATTEMPTS,
  NOTIFICATION_WINDOW_DAYS,
  sendHostNotification,
} from '../../shared/enquiryNotifications.ts';

const BATCH_LIMIT = 10;
const CHUNK_SIZE = 3;

// Sweeps up host alerts that were never accepted for delivery. Runs from a
// scheduled workflow, so it carries the same admin check as the alert itself.
export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403 });

    const cutoff = new Date(Date.now() - NOTIFICATION_WINDOW_DAYS * 86400000).toISOString();
    const { items } = await base44.asServiceRole.entities.Enquiry.filter(
      {
        notification_status: { $in: ['pending', 'failed'] },
        notification_attempts: { $lt: MAX_NOTIFICATION_ATTEMPTS },
      },
      { sort: 'created_date', limit: BATCH_LIMIT }
    );

    const pending = (items || []).filter((row: any) => !row.created_date || row.created_date >= cutoff);

    const outcomes: any[] = [];
    for (let start = 0; start < pending.length; start += CHUNK_SIZE) {
      const chunk = pending.slice(start, start + CHUNK_SIZE);
      const results = await Promise.allSettled(chunk.map((row: any) => sendHostNotification(base44, row)));
      results.forEach((result, index) => {
        const outcome = result.status === 'fulfilled' ? result.value : { sent: false, error: String(result.reason) };
        outcomes.push({ enquiry_id: chunk[index].id, ...outcome });
      });
    }

    return Response.json({
      checked: pending.length,
      sent: outcomes.filter((row) => row.sent).length,
      failed: outcomes.filter((row) => !row.sent && !row.skipped).length,
      skipped: outcomes.filter((row) => row.skipped).length,
      outcomes,
    });
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}