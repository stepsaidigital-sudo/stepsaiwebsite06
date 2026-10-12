import { NextResponse } from 'next/server';

// Demo requests from /book-a-demo/. The form posts here and we forward the request to
// DEMO_REQUEST_WEBHOOK_URL (a HubSpot form endpoint, Slack/Zapier/Make webhook, or similar).
// Without that setting the request is not sent anywhere and the visitor is told so.

const required = ['name', 'email', 'company'] as const;
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ ok: false, error: 'invalid' }, { status: 400 }); }
  const clean = (k: string) => String(body[k] ?? '').trim().slice(0, 2000);
  const data = { name: clean('name'), email: clean('email'), company: clean('company'), phone: clean('phone'), website: clean('website'), channels: clean('channels'), message: clean('message') };
  if (required.some(k => !data[k]) || !emailOk(data.email)) return NextResponse.json({ ok: false, error: 'missing' }, { status: 400 });
  if (String(body.company_url ?? '')) return NextResponse.json({ ok: true }); // honeypot: bots fill the hidden field

  const target = process.env.DEMO_REQUEST_WEBHOOK_URL;
  if (!target) return NextResponse.json({ ok: false, error: 'not-configured' }, { status: 503 });
  try {
    const res = await fetch(target, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, source: 'book-a-demo', submittedAt: new Date().toISOString() }) });
    if (!res.ok) return NextResponse.json({ ok: false, error: 'upstream' }, { status: 502 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'upstream' }, { status: 502 });
  }
}
