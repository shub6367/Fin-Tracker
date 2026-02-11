import { auth } from '@/lib/better-auth/auth'
import { headers } from 'next/headers'
import { connectToDatabase } from '@/database/mongoose'
import { Watchlist } from '@/database/models/watchlist.model'
import Link from 'next/link'
import { Star } from 'lucide-react'

export default async function WatchlistPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  const userId = session?.user?.id
  if (!userId) {
    return (
      <div className="watchlist-empty-container">
        <div className="watchlist-empty">
          <Star className="watchlist-star" />
          <h2 className="empty-title">No Watchlist Found</h2>
          <p className="empty-description">
            Sign in and add stocks to your watchlist by clicking the star or button on stock pages.
          </p>
          <Link href="/" className="search-btn">Go to Dashboard</Link>
        </div>
      </div>
    )
  }

  await connectToDatabase()
  const items = await Watchlist.find({ userId }).lean()

  if (!items || items.length === 0) {
    return (
      <div className="watchlist-empty-container">
        <div className="watchlist-empty">
          <Star className="watchlist-star" />
          <h2 className="empty-title">Your watchlist is empty</h2>
          <p className="empty-description">
            Use the search (Ctrl+K) and click the star to add stocks here.
          </p>
          <Link href="/" className="search-btn">Search Stocks</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="layout-container">
      <h1 className="watchlist-title">Watchlist</h1>
      <div className="watchlist">
        <div className="watchlist-table">
          <table className="min-w-full">
            <thead>
              <tr className="table-header-row">
                <th className="table-header text-left py-3">Company</th>
                <th className="table-header text-left py-3">Symbol</th>
                <th className="table-header text-left py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={String(i.symbol)} className="table-row">
                  <td className="table-cell py-3 pl-4">
                    <Link href={`/stocks/${String(i.symbol)}`}>{String(i.company)}</Link>
                  </td>
                  <td className="table-cell py-3">{String(i.symbol)}</td>
                  <td className="table-cell py-3">
                    <Link href={`/stocks/${String(i.symbol)}`} className="add-alert">View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
