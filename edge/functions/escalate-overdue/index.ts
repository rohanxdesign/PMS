// POST /escalate-overdue
export const config = { runtime: "edge" };

export default async function handler(req: Request) {
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405 });
  const body = await req.json().catch(() => ({}));
  // Expected body: { orgId, items: [{ id, type, dueAt }] }
  // TODO: write to NotificationOutbox and surface on Founders dashboard
  return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "content-type": "application/json" } });
}



