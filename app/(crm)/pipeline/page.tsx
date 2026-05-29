import { KanbanBoard } from '@/components/pipeline/kanban-board'
import { deals } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/utils'

export default function PipelinePage() {
  const active = deals.filter(d => d.stage !== 'lost' && d.stage !== 'won')
  const totalPipelineValue = active.reduce((s, d) => s + d.value, 0)
  const weightedValue = active.reduce((s, d) => s + d.value * d.probability / 100, 0)

  return (
    <div className="max-w-[1400px] space-y-5">
      {/* Summary — 2×2 on mobile, 4-col on sm+ */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Active Deals',   value: active.length.toString() },
          { label: 'Total Pipeline', value: formatCurrency(totalPipelineValue) },
          { label: 'Weighted Value', value: formatCurrency(weightedValue) },
          { label: 'Avg Deal Size',  value: formatCurrency(active.length ? totalPipelineValue / active.length : 0) },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-xl border border-zinc-800 bg-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 light:border-slate-200 light:bg-white p-4">
            <p className="text-xs text-zinc-500 dark:text-zinc-500 light:text-slate-500">{label}</p>
            <p className="text-lg font-bold text-zinc-100 dark:text-zinc-100 light:text-slate-900 mt-1">{value}</p>
          </div>
        ))}
      </div>

      {/* Kanban */}
      <KanbanBoard />
    </div>
  )
}
