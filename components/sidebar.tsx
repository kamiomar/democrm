'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Users, Kanban, BarChart3,
  Settings, ChevronDown, Zap,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const nav = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/contacts', icon: Users, label: 'Contacts' },
  { href: '/pipeline', icon: Kanban, label: 'Pipeline' },
  { href: '/reports', icon: BarChart3, label: 'Reports', disabled: true },
  { href: '/settings', icon: Settings, label: 'Settings', disabled: true },
]

export function Sidebar() {
  const path = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-60 flex-col bg-zinc-900 border-r border-zinc-800 dark:bg-zinc-900 dark:border-zinc-800 light:bg-white light:border-slate-200">
      {/* Logo */}
      <div className="flex items-center gap-2.5 h-16 px-5 border-b border-zinc-800 dark:border-zinc-800 light:border-slate-200">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-900/30">
          <Zap size={16} className="text-white" strokeWidth={2.5} />
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-100 dark:text-zinc-100 light:text-slate-900 leading-tight">MarqueCRM</p>
          <p className="text-[10px] text-zinc-500 dark:text-zinc-500 light:text-slate-500 leading-tight">by MarqueFactory</p>
        </div>
      </div>

      {/* Workspace */}
      <div className="px-3 pt-4 pb-2">
        <button className="flex w-full items-center gap-2 px-3 py-2 rounded-lg text-xs text-zinc-400 dark:text-zinc-400 light:text-slate-500 hover:bg-zinc-800 dark:hover:bg-zinc-800 light:hover:bg-slate-100 transition-colors">
          <div className="w-5 h-5 rounded bg-gradient-to-br from-emerald-500 to-teal-600 flex-shrink-0" />
          <span className="truncate font-medium text-zinc-300 dark:text-zinc-300 light:text-slate-700">Acme Corp Workspace</span>
          <ChevronDown size={12} className="ml-auto flex-shrink-0" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
        <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-600 dark:text-zinc-600 light:text-slate-400">Main</p>
        {nav.map(({ href, icon: Icon, label, disabled }) => {
          const active = !disabled && (path === href || (href !== '/dashboard' && path.startsWith(href)))
          return (
            <Link
              key={href}
              href={disabled ? '#' : href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150',
                active
                  ? 'bg-violet-600/15 text-violet-400 dark:bg-violet-600/15 dark:text-violet-400 light:bg-violet-50 light:text-violet-700'
                  : 'text-zinc-400 dark:text-zinc-400 light:text-slate-600 hover:bg-zinc-800 dark:hover:bg-zinc-800 light:hover:bg-slate-100 hover:text-zinc-100 dark:hover:text-zinc-100 light:hover:text-slate-900',
                disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
              )}
            >
              <Icon
                size={16}
                className={cn(active ? 'text-violet-400 dark:text-violet-400 light:text-violet-600' : '')}
              />
              <span className="font-medium">{label}</span>
              {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-violet-400 dark:bg-violet-400 light:bg-violet-600" />}
            </Link>
          )
        })}
      </nav>

      {/* User */}
      <div className="p-3 border-t border-zinc-800 dark:border-zinc-800 light:border-slate-200">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-zinc-800 dark:hover:bg-zinc-800 light:hover:bg-slate-100 transition-colors">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-xs font-semibold text-white flex-shrink-0">
            AC
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-zinc-200 dark:text-zinc-200 light:text-slate-800 truncate">Alex Chen</p>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-500 light:text-slate-500 truncate">Admin</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
