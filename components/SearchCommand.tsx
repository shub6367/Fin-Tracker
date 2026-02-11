"use client"

import { useEffect, useState } from "react"
import { CommandDialog, CommandEmpty, CommandInput, CommandList } from "@/components/ui/command"
import { Loader2, TrendingUp, Star } from "lucide-react"
import Link from "next/link"
import { useDebounce } from "@/hooks/useDebounce"


interface SearchCommandProps {
  label?: string
  initialStocks?: StockWithWatchlistStatus[]
}

interface StockWithWatchlistStatus {
  symbol: string
  name: string
  exchange: string
  type: string
  isInWatchlist: boolean
}

export default function SearchCommand({ label = 'Search', initialStocks = [] }: SearchCommandProps) {
  const [open, setOpen] = useState(false)
  
  const handleOpenChange = (newOpen: boolean) => {
    console.log('Dialog open state changing to:', newOpen);
    setOpen(newOpen);
  }
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const [stocks, setStocks] = useState<StockWithWatchlistStatus[]>(initialStocks);

  const isSearchMode = !!searchTerm.trim();
  const displayStocks = isSearchMode ? stocks : stocks?.slice(0, 10);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen(v => !v)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const handleSearch = async () => {
    setLoading(true)
    try {
        const q = searchTerm.trim();
        const res = await fetch(`/api/finnhub/search${q ? `?q=${encodeURIComponent(q)}` : ''}`, {
          method: 'GET',
        });
        if (!res.ok) {
          throw new Error(`Search request failed ${res.status}`);
        }
        const results: StockWithWatchlistStatus[] = await res.json();
        setStocks(Array.isArray(results) ? results : []);
    } catch {
      setStocks([])
    } finally {
      setLoading(false)
    }
  }

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    handleSearch();
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (open && !isSearchMode && stocks.length === 0) {
      handleSearch();
    }
  }, [open]);

  const handleSelectStock = () => {
    setOpen(false);
    setSearchTerm("");
    setStocks(initialStocks);
  }

  const toggleWatchlist = async (stock: StockWithWatchlistStatus) => {
    try {
      const isAdded = !!stock.isInWatchlist;
      const url = isAdded ? '/api/watchlist/remove' : '/api/watchlist/add';
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol: stock.symbol, company: stock.name }),
      });
      if (!res.ok) throw new Error('Failed to toggle watchlist');
      setStocks((prev) =>
        prev.map((s) =>
          s.symbol === stock.symbol ? { ...s, isInWatchlist: !isAdded } : s
        )
      );
    } catch (e) {
      console.error('toggleWatchlist error', e);
    }
  }

  return (
    <>
      <span onClick={() => {
        console.log('Search text clicked');
        setOpen(true);
      }} className="search-text">
        {label}
      </span>
      <CommandDialog open={open} onOpenChange={handleOpenChange}>
         
        <div className="search-field">
          <CommandInput 
            value={searchTerm} 
            onValueChange={setSearchTerm} 
            placeholder="Search stocks..." 
            className="search-input" 
          />
          {loading && <Loader2 className="search-loader" />}
        </div>
        <CommandList className="search-list">
          {loading ? (
              <CommandEmpty className="search-list-empty">Loading stocks...</CommandEmpty>
          ) : displayStocks?.length === 0 ? (
              <div className="search-list-indicator">
                {isSearchMode ? 'Loading ...' : 'No stocks available'}
              </div>
            ) : (
            <ul>
              <div className="search-count">
                {isSearchMode ? 'Search results' : 'Popular stocks'}
                {` `}({displayStocks?.length || 0})
              </div>
              {displayStocks?.map((stock) => (
                  <li key={stock.symbol} className="search-item">
                    <Link
                        href={`/stocks/${stock.symbol}`}
                        onClick={handleSelectStock}
                        className="search-item-link"
                    >
                      <TrendingUp className="h-4 w-4 text-gray-500" />
                      <div className="flex-1">
                        <div className="search-item-name">
                          {stock.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {stock.symbol} | {stock.exchange} | {stock.type}
                        </div>
                    </div>
                    <button
                      type="button"
                      className={`watchlist-icon-btn ${stock.isInWatchlist ? 'watchlist-icon-added' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWatchlist(stock);
                      }}
                      aria-label={stock.isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
                    >
                      <div className="watchlist-icon">
                        <Star
                          className="star-icon"
                          fill={stock.isInWatchlist ? 'currentColor' : 'none'}
                        />
                      </div>
                    </button>
                    </Link>
                  </li>
              ))}
            </ul>
          )
          }
        </CommandList>
      </CommandDialog>
    </>
  )
}
