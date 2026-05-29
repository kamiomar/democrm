'use client'

import { usePathname } from 'next/navigation'
import { Bell, Search } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'
import { useState } from 'react'

const titles: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Welcome back, Alex' },
  '/contacts': { title: 'Contacts', subtitle: 'Manage your leads and customers' },
  '/pipeline': { title: 'Pipeline', subtitle: 'Track deals across stages' },
}

export function Header() {
  const path = usePathname()
  const key = Object.keys(titles).find(k => path.startsWith(k)) ?? '/dashboard'
  const { title, subtitle } = titles[key] ?? { title: 'MarqueCRM', subtitle: '' }
  const [search, setSearch] = useState('')

  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 h-16 px-6 border-b bg-zinc-950/80 backdrop-blur-sm border-zinc-800 dark:bg-zinc-950/80 dark:border-zinc-800 light:bg-white/80 light:border-slate-200">
      <div className="flex-1 min-w-0">
        <h1 className="text-base font-semibold text-zinc-100 dark:text-zinc-100 light:text-slate-900 leading-tight">{title}</h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-500 light:text-slate-500 leading-tight hidden sm:block">{subtitle}</p>
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 px-3 h-8 w-56 rounded-lg bg-zinc-900 border border-zinc-800 dark:bg-zinc-900 dark:border-zinc-800 light:bg-slate-100 light:border-slate-200">
        <Search size={13} className="text-zinc-500 dark:text-zinc-500 light:text-slate-400 flex-shrink-0" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search…"
          className="flex-1 text-xs bg-transparent text-zinc-300 dark:text-zinc-300 light:text-slate-700 placeholder-zinc-600 dark:placeholder-zinc-600 light:placeholder-slate-400 outline-none"
        />
        <kbd className="text-[10px] text-zinc-600 dark:text-zinc-600 light:text-slate-400 font-mono">⌘K</kbd>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1">
        <button className="relative flex items-center justify-center w-8 h-8 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 dark:hover:bg-zinc-800 light:text-slate-500 light:hover:text-slate-900 light:hover:bg-slate-100 transition-colors">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-violet-500" />
        </button>
        <ThemeToggle />
        <div className="ml-1 w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xs font-semibold text-white cursor-pointer">
          AC
        </div>
      </div>
    </header>
  )
}
