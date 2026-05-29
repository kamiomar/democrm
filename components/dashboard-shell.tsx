'use client'

import { useState, useCallback } from 'react'
import { Sidebar } from './sidebar'
import { Header } from './header'

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const close = useCallback(() => setSidebarOpen(false), [])
  const toggle = useCallback(() => setSidebarOpen(s => !s), [])

  return (
    <div className="min-h-screen bg-zinc-950 dark:bg-zinc-950 light:bg-slate-50">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={close}
        />
      )}

      <Sidebar isOpen={sidebarOpen} onClose={close} />

      {/* Main area — offset by sidebar width on lg+ */}
      <div className="lg:pl-60 flex flex-col min-h-screen">
        <Header onMenuClick={toggle} />
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}
