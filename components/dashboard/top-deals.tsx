import { deals } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/utils'
import { cn } from '@/lib/utils'
import type { DealStage } from '@/lib/mock-data'

const stageBadge: Record<DealStage, string> = {
  new: 'bg-indigo-500/10 text-indigo-400',
  qualified: 'bg-violet-500/10 text-violet-400',
  proposal: 'bg-amber-500/10 text-amber-400',
  negotiation: 'bg-orange-500/10 text-orange-400',
  won: 'bg-emerald-500/10 text-emerald-400',
  lost: 'bg-rose-500/10 text-rose-400',
}

const stageShort: Record<DealStage, string> = {
  new: 'New',
  qualified: 'Qualified',
  proposal: 'Proposal',
  negotiation: 'Negotiating',
  won: 'Won',
  lost: 'Lost',
}

const top = [...deals]
  .filter(d => d.stage !== 'lost')
  .sort((a, b) => b.value - a.value)
  .slice(0, 5)

export function TopDeals() {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 light:border-slate-200 light:bg-white p-5">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold text-zinc-100 dark:text-zinc-100 light:text-slate-900">Top Deals</h3>
        <span className="text-xs text-violet-400 dark:text-violet-400 light:text-violet-600 cursor-pointer hover:underline">View pipeline</span>
      </div>
      <div className="space-y-3">
        {top.map((deal, i) => (
          <div key={deal.id} className="flex items-center gap-3">
            <span className="text-xs font-mono text-zinc-600 dark:text-zinc-600 light:text-slate-400 w-4">{i + 1}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-zinc-200 dark:text-zinc-200 light:text-slate-800 truncate">{deal.company}</p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-500 light:text-slate-500">{deal.contactName}</p>
            </div>
            <span className={cn('text-[10px] font-medium px-2 py-0.5 rounded-full', stageBadge[deal.stage])}>
              {stageShort[deal.stage]}
            </span>
            <span className="text-xs font-semibold text-zinc-200 dark:text-zinc-200 light:text-slate-800 tabular-nums">
              {formatCurrency(deal.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
