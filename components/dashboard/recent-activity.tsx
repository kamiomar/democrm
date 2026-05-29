import { activities, contacts } from '@/lib/mock-data'
import { Mail, Phone, FileText, Calendar, RefreshCw, TrendingUp } from 'lucide-react'
import { formatRelativeDate, initials } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { ActivityType } from '@/lib/mock-data'

const iconMap: Record<ActivityType, React.ElementType> = {
  email: Mail,
  call: Phone,
  note: FileText,
  meeting: Calendar,
  deal_update: TrendingUp,
  stage_change: RefreshCw,
}

const colorMap: Record<ActivityType, string> = {
  email: 'bg-blue-500/10 text-blue-400',
  call: 'bg-emerald-500/10 text-emerald-400',
  note: 'bg-amber-500/10 text-amber-400',
  meeting: 'bg-violet-500/10 text-violet-400',
  deal_update: 'bg-indigo-500/10 text-indigo-400',
  stage_change: 'bg-rose-500/10 text-rose-400',
}

const sorted = [...activities].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 6)

export function RecentActivity() {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 light:border-slate-200 light:bg-white p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold text-zinc-100 dark:text-zinc-100 light:text-slate-900">Recent Activity</h3>
        <span className="text-xs text-violet-400 dark:text-violet-400 light:text-violet-600 cursor-pointer hover:underline">View all</span>
      </div>
      <div className="space-y-4">
        {sorted.map(activity => {
          const Icon = iconMap[activity.type]
          const contact = contacts.find(c => c.id === activity.contactId)
          return (
            <div key={activity.id} className="flex items-start gap-3">
              <div className={cn('w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5', colorMap[activity.type])}>
                <Icon size={13} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-zinc-200 dark:text-zinc-200 light:text-slate-800 truncate">{activity.title}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-500 light:text-slate-500 truncate mt-0.5">{contact?.name} · {contact?.company}</p>
              </div>
              <span className="text-[10px] text-zinc-600 dark:text-zinc-600 light:text-slate-400 flex-shrink-0 mt-0.5">
                {formatRelativeDate(activity.timestamp)}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
