import React from 'react'
import { Button } from '@/components/ui/button'
import TradingViewWidget from '@/components/TradingViewWidget';
import { MARKET_OVERVIEW_WIDGET_CONFIG, HEATMAP_WIDGET_CONFIG,MARKET_DATA_WIDGET_CONFIG,TOP_STORIES_WIDGET_CONFIG } from '@/lib/constants';

const Homepage = () => {
  return (
    <div className="flex min-h-screen home-wrapper ">
      <section className="grid w-full gap-8 home-section pl-6 md:pl-8 xl:pl-12  md:pr-8 xr:pr-12 ">
        <div className="md:col-span-1 xl:col-span-1">
          <TradingViewWidget
            title="Market Overview"
            scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js"

            config={MARKET_OVERVIEW_WIDGET_CONFIG}
            className="custom-chart"
            
          />
        </div>
        <div className="md:col-span-2 xl:col-span-2">
           <TradingViewWidget
            title="Stock Heatmap"
            scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js"

            config={HEATMAP_WIDGET_CONFIG}
            className="custom-chart"
            
          />
          
        </div>
     
      </section>
      <section className="grid w-full gap-8 home-section pl-6 md:pl-8 xl:pl-12  md:pr-8 xr:pr-12 ">
            <div className="md:col-span-1 xl:col-span-1">
          <TradingViewWidget
            
            scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-timeline.js"

            config={TOP_STORIES_WIDGET_CONFIG}
          
          />
        </div>
        <div className="md:col-span-2 xl:col-span-2">
           <TradingViewWidget
        
            scriptUrl="https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js"

            config={MARKET_DATA_WIDGET_CONFIG}
          
          />
        </div>
      </section>
    </div>
  )
}

export default Homepage;