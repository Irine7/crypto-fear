import { NextRequest, NextResponse } from 'next/server';
import { readDb } from '../../../../db';

export async function GET(req: NextRequest) {
  const currentHistory = await readDb();
  const { searchParams } = new URL(req.url);
  const limitStr = searchParams.get('limit');
  const limit = limitStr ? Number(limitStr) : null;

  if (limit !== null && (isNaN(limit) || limit <= 0)) {
    return NextResponse.json({ error: "Invalid limit parameter" }, { status: 400 });
  }

  const result = limit ? currentHistory.slice(-limit) : currentHistory;
  return NextResponse.json(result);
}
