'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, Users, Kanban, BarChart3,
  Settings, ChevronDown, Zap, UserRound,
  Shield, TrendingUp, X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { contacts, deals, CURRENT_USER, type UserRole } from '@/lib/mock-data'

const roleStyle: Record<UserRole, string> = {
  'Admin':         'text-violet-400',
  'Sales Manager': 'text-indigo-400',
  'Sales Rep':     'text-emerald-400',
}
const roleIcon: Record<UserRole, React.ElementType> = {
  'Admin':         Shield,
  'Sales Manager': TrendingUp,
  'Sales Rep':     UserRound,
}

const openDeals     = deals.filter(d => d.stage !== 'won' && d.stage !== 'lost').length
const totalContacts = contacts.length

const nav = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', badge: null },
  { href: '/contacts',  icon: Users,           label: 'Contacts',  badge: totalContacts },
  { href: '/pipeline',  icon: Kanban,          label: 'Pipeline',  badge: openDeals },
  { href: '/team',      icon: UserRound,       label: 'Team',      badge: null },
  { href: '/reports',   icon: BarChart3,       label: 'Reports',   badge: null, disabled: true },
  { href: '/settings',  icon: Settings,        label: 'Settings',  badge: null, disabled: true },
]

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const path = usePathname()
  const RoleIcon = roleIcon[CURRENT_USER.role]

  return (
    <aside className={cn(
      // Base — always fixed, full height, 240 px wide
      'fixed inset-y-0 left-0 z-40 flex w-60 flex-col',
      'bg-zinc-900 border-r border-zinc-800',
      'dark:bg-zinc-900 dark:border-zinc-800',
      'light:bg-white light:border-slate-200',
      // Slide transition
      'transition-transform duration-300 ease-in-out',
      // Mobile: hidden by default, visible when isOpen
      // Desktop (lg+): always visible regardless of isOpen
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
    )}>

      {/* Logo row */}
      <div className="flex items-center h-16 px-5 border-b border-zinc-800 dark:border-zinc-800 light:border-slate-200">
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-900/30 flex-shrink-0">
            <Zap size={16} className="text-white" strokeWidth={2.5} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-zinc-100 dark:text-zinc-100 light:text-slate-900 leading-tight">MarqueCRM</p>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-500 light:text-slate-500 leading-tight">by MarqueFactory</p>
          </div>
        </div>
        {/* Close button — mobile only */}
        <button
          onClick={onClose}
          className="lg:hidden flex items-center justify-center w-7 h-7 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-colors flex-shrink-0"
        >
          <X size={14} />
        </button>
      </div>

      {/* Workspace */}
      <div className="px-3 pt-4 pb-2">
        <button className="flex w-full items-center gap-2 px-3 py-2 rounded-lg text-xs hover:bg-zinc-800 dark:hover:bg-zinc-800 light:hover:bg-slate-100 transition-colors">
          <div className="w-5 h-5 rounded bg-gradient-to-br from-emerald-500 to-teal-600 flex-shrink-0" />
          <span className="truncate font-medium text-zinc-300 dark:text-zinc-300 light:text-slate-700">Acme Corp Workspace</span>
          <ChevronDown size={12} className="ml-auto flex-shrink-0 text-zinc-600 dark:text-zinc-600 light:text-slate-400" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
        <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-600 dark:text-zinc-600 light:text-slate-400">Main</p>
        {nav.map(({ href, icon: Icon, label, badge, disabled }) => {
          const active = !disabled && (path === href || (href !== '/dashboard' && path.startsWith(href)))
          return (
            <Link
              key={href}
              href={disabled ? '#' : href}
              onClick={onClose}            /* close drawer on mobile nav */
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150',
                active
                  ? 'bg-violet-600/15 text-violet-400 dark:bg-violet-600/15 dark:text-violet-400 light:bg-violet-50 light:text-violet-700'
                  : 'text-zinc-400 dark:text-zinc-400 light:text-slate-600 hover:bg-zinc-800 dark:hover:bg-zinc-800 light:hover:bg-slate-100 hover:text-zinc-100 dark:hover:text-zinc-100 light:hover:text-slate-900',
                disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
              )}
            >
              <Icon size={16} className={cn(active ? 'text-violet-400 dark:text-violet-400 light:text-violet-600' : '')} />
              <span className="font-medium flex-1">{label}</span>
              {badge !== null && (
                <span className={cn(
                  'text-[10px] font-semibold px-1.5 py-0.5 rounded-full min-w-[18px] text-center',
                  active
                    ? 'bg-violet-500/20 text-violet-300'
                    : 'bg-zinc-800 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500 light:bg-slate-100 light:text-slate-500',
                )}>
                  {badge}
                </span>
              )}
              {active && badge === null && (
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 dark:bg-violet-400 light:bg-violet-600" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Current user */}
      <div className="p-3 border-t border-zinc-800 dark:border-zinc-800 light:border-slate-200">
        <Link
          href="/team"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-zinc-800 dark:hover:bg-zinc-800 light:hover:bg-slate-100 transition-colors"
        >
          <div className={cn('w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0', CURRENT_USER.color)}>
            {CURRENT_USER.initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-zinc-200 dark:text-zinc-200 light:text-slate-800 truncate">{CURRENT_USER.name}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <RoleIcon size={9} className={roleStyle[CURRENT_USER.role]} />
              <p className={cn('text-[10px] font-medium truncate', roleStyle[CURRENT_USER.role])}>
                {CURRENT_USER.role}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </aside>
  )
}
