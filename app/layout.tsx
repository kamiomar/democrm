import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })

export const metadata: Metadata = {
  title: 'MarqueCRM — Premium CRM Demo',
  description: 'A premium CRM platform built by MarqueFactory',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <body className="font-[var(--font-geist)] antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
