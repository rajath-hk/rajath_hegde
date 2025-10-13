import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const endpoint = process.env.FORM_ENDPOINT || process.env.NEXT_PUBLIC_FORM_ENDPOINT;
  if (!endpoint) {
    return NextResponse.json({ error: 'Form endpoint not configured' }, { status: 501 });
  }

  try {
    const body = await request.json();
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const text = await res.text();
    return NextResponse.json({ ok: true, response: text }, { status: res.status });
  } catch (err) {
    console.error('Error forwarding contact form:', err);
    return NextResponse.json({ error: 'Forward failed' }, { status: 500 });
  }
}
