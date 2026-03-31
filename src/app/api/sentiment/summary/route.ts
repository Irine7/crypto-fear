import { NextResponse } from 'next/server';
import { getSentimentSummary } from '../../../../services/sentimentService';

export async function GET() {
  try {
    const summary = await getSentimentSummary();
    if (!summary) {
      return NextResponse.json({ error: "Failed to calculate sentiment summary" }, { status: 503 });
    }
    return NextResponse.json(summary);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
