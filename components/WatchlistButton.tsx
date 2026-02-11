'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function WatchlistButton({
  symbol,
  company,
  isInWatchlist,
  showTrashIcon,
  type = 'button',
  onWatchlistChange,
}: WatchlistButtonProps) {
  const [added, setAdded] = useState<boolean>(!!isInWatchlist)

  const handleClick = async () => {
    try {
      const next = !added
      const url = next ? '/api/watchlist/add' : '/api/watchlist/remove';
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol, company }),
      });
      if (!res.ok) throw new Error('Failed to toggle watchlist');
      setAdded(next)
      onWatchlistChange?.(symbol, next)
    } catch (e) {
      console.error('WatchlistButton toggle error', e);
    }
  }

  return (
    <div className="mb-4">
      <Button
        onClick={handleClick}
        aria-label={added ? 'Remove from watchlist' : 'Add to watchlist'}
        className="watchlist-btn"
      >
        {added ? 'Remove from Watchlist' : 'Add to Watchlist'}
      </Button>
    </div>
  )
}
