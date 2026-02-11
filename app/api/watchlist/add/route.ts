import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/better-auth/auth';
import { headers } from 'next/headers';
import { connectToDatabase } from '@/database/mongoose';
import { Watchlist } from '@/database/models/watchlist.model';

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
    }
    const body = await req.json().catch(() => ({}));
    const symbol = String(body?.symbol || '').trim().toUpperCase();
    const company = String(body?.company || '').trim();
    if (!symbol || !company) {
      return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 });
    }
    await connectToDatabase();
    await Watchlist.updateOne(
      { userId, symbol },
      { $setOnInsert: { userId, symbol, company, addedAt: new Date() } },
      { upsert: true }
    );
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
