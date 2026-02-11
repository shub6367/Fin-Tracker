import { NextRequest, NextResponse } from 'next/server';
import { searchStocks } from '@/lib/actions/finnhub.actions';
import { auth } from '@/lib/better-auth/auth';
import { headers } from 'next/headers';
import { connectToDatabase } from '@/database/mongoose';
import { Watchlist } from '@/database/models/watchlist.model';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q') || undefined;
    const [results, session] = await Promise.all([
      searchStocks(q),
      auth.api.getSession({ headers: await headers() }),
    ]);
    const userId = session?.user?.id;
    if (userId) {
      await connectToDatabase();
      const items = await Watchlist.find({ userId }, { symbol: 1 }).lean();
      const set = new Set(items.map((i) => String(i.symbol).toUpperCase()));
      for (const r of results) {
        r.isInWatchlist = set.has(r.symbol.toUpperCase());
      }
    }
    return NextResponse.json(results);
  } catch (err) {
    return NextResponse.json([], { status: 200 });
  }
}
