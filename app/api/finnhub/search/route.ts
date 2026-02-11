import { NextRequest, NextResponse } from 'next/server';
import { searchStocks } from '@/lib/actions/finnhub.actions';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q') || undefined;
    const results = await searchStocks(q);
    return NextResponse.json(results);
  } catch (err) {
    return NextResponse.json([], { status: 200 });
  }
}
