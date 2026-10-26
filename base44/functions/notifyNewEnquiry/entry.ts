import { createClientFromRequest } from 'npm:@base44/sdk@0.8.54';
import { sendHostNotification } from '../../shared/enquiryNotifications.ts';

// Called by the enquiry workflow, which runs as an app admin. Its URL is public,
// so the admin check stays: a guest must not be able to trigger host emails.
export default async function (req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403 });

    const body = await req.json().catch(() => ({}));
    const enquiryId = typeof body.enquiry_id === 'string' ? body.enquiry_id : '';
    if (!enquiryId) return Response.json({ error: 'enquiry_id is required' }, { status: 400 });

    const enquiry = await base44.asServiceRole.entities.Enquiry.get(enquiryId);
    if (!enquiry) return Response.json({ error: 'Enquiry not found' }, { status: 404 });

    // The outcome is written onto the enquiry: sent, or failed with the reason.
    const outcome = await sendHostNotification(base44, enquiry);

    return Response.json({ enquiry_id: enquiryId, ...outcome });
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}