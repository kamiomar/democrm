import { TrendingUp, TrendingDown, Users, DollarSign, Trophy, Target } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Stat {
  label: string
  value: string
  change: number
  icon: React.ElementType
  iconBg: string
  prefix?: string
}

const stats: Stat[] = [
  { label: 'Total Contacts', value: '2,847', change: 12.4, icon: Users, iconBg: 'bg-violet-500/10 text-violet-400' },
  { label: 'Pipeline Value', value: '$485,200', change: 8.1, icon: DollarSign, iconBg: 'bg-indigo-500/10 text-indigo-400' },
  { label: 'Deals Won (MTD)', value: '23', change: 4.5, icon: Trophy, iconBg: 'bg-emerald-500/10 text-emerald-400' },
  { label: 'Conversion Rate', value: '32%', change: -1.8, icon: Target, iconBg: 'bg-amber-500/10 text-amber-400' },
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map(({ label, value, change, icon: Icon, iconBg }) => (
        <div
          key={label}
          className="rounded-xl border border-zinc-800 bg-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 light:border-slate-200 light:bg-white p-5 flex flex-col gap-4"
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-zinc-400 dark:text-zinc-400 light:text-slate-500">{label}</p>
            <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', iconBg)}>
              <Icon size={15} />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-zinc-100 dark:text-zinc-100 light:text-slate-900 leading-none">{value}</p>
            <div className={cn('flex items-center gap-1 mt-2 text-xs font-medium', change >= 0 ? 'text-emerald-400' : 'text-rose-400')}>
              {change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              <span>{change >= 0 ? '+' : ''}{change}% vs last month</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
