import TradingViewWidget from '@/components/TradingViewWidget'
import WatchlistButton from '@/components/WatchlistButton'
import {
  CANDLE_CHART_WIDGET_CONFIG,
  BASELINE_WIDGET_CONFIG,
  TECHNICAL_ANALYSIS_WIDGET_CONFIG,
  COMPANY_PROFILE_WIDGET_CONFIG,
  COMPANY_FINANCIALS_WIDGET_CONFIG,
  SYMBOL_INFO_WIDGET_CONFIG,
} from '@/lib/constants'
import { getCompanyProfile } from '@/lib/actions/finnhub.actions'

export default async function Stockdetails({ params }: StockDetailsPageProps) {
  const { symbol } = await params
  const sym = (symbol || '').toUpperCase()
  const profile = await getCompanyProfile(sym)

  return (
    <div className="flex min-h-screen home-wrapper">
      <section className="grid w-full gap-8 home-section pl-6 md:pl-8 xl:pl-12 md:pr-8 xl:pr-12">
        <div className="md:col-span-2 xl:col-span-2 space-y-6">
           <TradingViewWidget
                 
          scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js"
          
          config={SYMBOL_INFO_WIDGET_CONFIG(sym)}
        />
        <TradingViewWidget
          title="Candle Chart"
          scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"
          config={CANDLE_CHART_WIDGET_CONFIG(sym)}
        />
        <TradingViewWidget
          title="Baseline Chart"
          scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js"
          config={BASELINE_WIDGET_CONFIG(sym)}
        />
        </div>

        <div className="md:col-span-1 xl:col-span-1 space-y-6">
        <WatchlistButton
          symbol={sym}
          company={sym}
          isInWatchlist={false}
          type="button"
        />      
        
          <TradingViewWidget
          title="Company Profile"
          scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-company-profile.js"
          config={COMPANY_PROFILE_WIDGET_CONFIG(sym)}
        />
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
          <div className="text-xl font-semibold text-gray-100 mb-3">
            {profile?.name || sym}
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-400">
            <div>Symbol</div><div className="text-gray-100 font-medium">{sym}</div>
            <div>Exchange</div><div className="text-gray-100 font-medium">{profile?.exchange || '—'}</div>
            <div>Country</div><div className="text-gray-100 font-medium">{profile?.country || '—'}</div>
            <div>Industry</div><div className="text-gray-100 font-medium">{profile?.finnhubIndustry || '—'}</div>
            <div>IPO</div><div className="text-gray-100 font-medium">{profile?.ipo || '—'}</div>
            <div>Market Cap</div><div className="text-gray-100 font-medium">{profile?.marketCapitalization ? `${Math.round(profile.marketCapitalization)}B` : '—'}</div>
            <div>Website</div><div className="text-gray-100 font-medium break-all">{profile?.weburl || '—'}</div>
          </div>
        </div>
        <TradingViewWidget
          title="Technical Analysis"
          scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js"
          config={TECHNICAL_ANALYSIS_WIDGET_CONFIG(sym)}
        />

        <TradingViewWidget
          title="Company Financials"
          scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-financials.js"
          config={COMPANY_FINANCIALS_WIDGET_CONFIG(sym)}
        />
        </div>
      </section>
    </div>
  )
}
