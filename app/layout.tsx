import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner';
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FinTracker',
  description: 'Track your stocksfinancewith ease',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {/* Layout UI */}
        {/* Place children where you want to render a page or nested layout */}
        <main className="min-h-screen">{children}
          <Toaster />
        </main>
      </body>
    </html>
  )
}