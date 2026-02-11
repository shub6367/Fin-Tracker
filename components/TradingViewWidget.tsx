'use client'
import { useEffect, useRef, memo } from 'react'
import { cn } from '@/lib/utils'

interface TradingViewWidgetProps {
  title?: string
  scriptUrl?: string
  config?: any
  className?: string
}

function TradingViewWidget({ title, scriptUrl, config, className }: TradingViewWidgetProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    containerRef.current.innerHTML = ''
    const inner = document.createElement('div')
    inner.className = 'tradingview-widget-container__widget'
    containerRef.current.appendChild(inner)

    const script = document.createElement('script')
    script.src = scriptUrl || 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js'
    script.async = true
    script.innerHTML = JSON.stringify(config || {
      colorTheme: 'dark',
      dateRange: '12M',
      locale: 'en',
      showChart: true,
      width: '100%',
      height: 550,
      tabs: [
        {
          title: 'Indices',
          symbols: [
            { s: 'FOREXCOM:SPXUSD', d: 'S&P 500' },
            { s: 'FOREXCOM:NSXUSD', d: 'US 100' },
            { s: 'FOREXCOM:DJI', d: 'Dow Jones' },
            { s: 'INDEX:NKY', d: 'Nikkei 225' },
            { s: 'INDEX:DEU40', d: 'DAX' },
            { s: 'FOREXCOM:UKXGBP', d: 'FTSE 100' },
          ],
        },
        {
          title: 'Forex',
          symbols: [
            { s: 'FX:EURUSD', d: 'EUR/USD' },
            { s: 'FX:GBPUSD', d: 'GBP/USD' },
            { s: 'FX:USDJPY', d: 'USD/JPY' },
          ],
        },
      ],
    })

    containerRef.current.appendChild(script)

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [scriptUrl, config])

  return (
    <div className={cn("w-full")}>
        {title && <h3 className={cn("font-semibold", "text-2xl", "text-gray-100", "mb-5")}>{title}</h3>}
    <div
      ref={containerRef}
      className={cn("tradingview-widget-container", className)}
      style={{ width: '100%' }}
    />
    </div>
  )
}

export default memo(TradingViewWidget)
