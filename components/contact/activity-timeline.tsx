'use client'

import { useState } from 'react'
import { activities, type Activity, type ActivityType } from '@/lib/mock-data'
import { Mail, Phone, FileText, Calendar, RefreshCw, TrendingUp, Plus } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

const iconMap: Record<ActivityType, React.ElementType> = {
  email: Mail,
  call: Phone,
  note: FileText,
  meeting: Calendar,
  deal_update: TrendingUp,
  stage_change: RefreshCw,
}

const colorMap: Record<ActivityType, string> = {
  email: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  call: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
  note: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  meeting: 'bg-violet-500/15 text-violet-400 border-violet-500/20',
  deal_update: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/20',
  stage_change: 'bg-rose-500/15 text-rose-400 border-rose-500/20',
}

const typeLabel: Record<ActivityType, string> = {
  email: 'Email',
  call: 'Call',
  note: 'Note',
  meeting: 'Meeting',
  deal_update: 'Deal Update',
  stage_change: 'Stage Change',
}

export function ActivityTimeline({ contactId }: { contactId: string }) {
  const contactActivities = activities
    .filter(a => a.contactId === contactId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-zinc-100 dark:text-zinc-100 light:text-slate-900">Activity</h3>
        <button className="flex items-center gap-1.5 px-3 h-7 rounded-lg bg-zinc-800 dark:bg-zinc-800 light:bg-slate-100 text-xs font-medium text-zinc-400 dark:text-zinc-400 light:text-slate-600 hover:text-zinc-200 dark:hover:text-zinc-200 light:hover:text-slate-900 transition-colors">
          <Plus size={12} />Log Activity
        </button>
      </div>

      {contactActivities.length === 0 ? (
        <p className="text-xs text-zinc-600 dark:text-zinc-600 light:text-slate-400 py-8 text-center">No activities yet</p>
      ) : (
        <div className="relative space-y-1">
          <div className="absolute left-3.5 top-0 bottom-0 w-px bg-zinc-800 dark:bg-zinc-800 light:bg-slate-200" />
          {contactActivities.map(activity => {
            const Icon = iconMap[activity.type]
            const open = expanded === activity.id
            return (
              <div key={activity.id} className="relative pl-10">
                <div className={cn('absolute left-0 w-7 h-7 rounded-full border flex items-center justify-center', colorMap[activity.type])}>
                  <Icon size={12} />
                </div>
                <button
                  onClick={() => setExpanded(open ? null : activity.id)}
                  className="w-full text-left"
                >
                  <div className="rounded-lg border border-zinc-800 dark:border-zinc-800 light:border-slate-200 bg-zinc-900/50 dark:bg-zinc-900/50 light:bg-white p-3 hover:border-zinc-700 dark:hover:border-zinc-700 light:hover:border-slate-300 transition-colors">
                    <div className="flex items-center gap-2">
                      <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full border', colorMap[activity.type])}>
                        {typeLabel[activity.type]}
                      </span>
                      <span className="text-xs font-medium text-zinc-200 dark:text-zinc-200 light:text-slate-800 truncate flex-1">{activity.title}</span>
                      <span className="text-[10px] text-zinc-600 dark:text-zinc-600 light:text-slate-400 flex-shrink-0">{formatDate(activity.timestamp)}</span>
                    </div>
                    {open && (
                      <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-400 light:text-slate-600 leading-relaxed">
                        {activity.body}
                      </p>
                    )}
                  </div>
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
