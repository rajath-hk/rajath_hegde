import { sendMessage } from '@/actions/send-message';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  const result = await sendMessage(data);
  return NextResponse.json(result);
}
