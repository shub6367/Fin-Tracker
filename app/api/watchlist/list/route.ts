import { NextResponse } from 'next/server';
import { auth } from '@/lib/better-auth/auth';
import { headers } from 'next/headers';
import { connectToDatabase } from '@/database/mongoose';
import { Watchlist } from '@/database/models/watchlist.model';

export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json([], { status: 200 });
    }
    await connectToDatabase();
    const items = await Watchlist.find({ userId }).lean();
    const payload = items.map((i) => ({
      symbol: String(i.symbol).toUpperCase(),
      company: String(i.company),
      addedAt: i.addedAt,
    }));
    return NextResponse.json(payload, { status: 200 });
  } catch (err) {
    return NextResponse.json([], { status: 200 });
  }
}
