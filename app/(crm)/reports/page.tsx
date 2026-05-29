import { WinLossChart }    from '@/components/reports/win-loss-chart'
import { TeamPerformance } from '@/components/reports/team-performance'
import { LeadSources }     from '@/components/reports/lead-sources'
import { MonthlyTargets }  from '@/components/reports/monthly-targets'
import { deals, revenueData } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/utils'
import { TrendingUp, TrendingDown } from 'lucide-react'

// KPIs
const wonDeals   = deals.filter(d => d.stage === 'won')
const totalWon   = wonDeals.reduce((s, d) => s + d.value, 0)
const avgDealSz  = wonDeals.length ? totalWon / wonDeals.length : 0
const salesCycle = 47   // mock avg days
const lastRev    = revenueData.at(-1)!.revenue
const prevRev    = revenueData.at(-2)!.revenue
const revGrowth  = Math.round(((lastRev - prevRev) / prevRev) * 100)

const kpis = [
  { label: 'Total Revenue Closed', value: formatCurrency(totalWon),   change: revGrowth, positive: revGrowth > 0 },
  { label: 'Avg Deal Size',        value: formatCurrency(avgDealSz),  change: 6,  positive: true  },
  { label: 'Avg Sales Cycle',      value: `${salesCycle} days`,       change: -3, positive: true  },
  { label: 'Deals Closed Won',     value: wonDeals.length.toString(), change: 15, positive: true  },
]

export default function ReportsPage() {
  return (
    <div className="max-w-7xl space-y-4 sm:space-y-6">
      {/* KPI bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {kpis.map(({ label, value, change, positive }) => (
          <div key={label} className="rounded-xl border border-zinc-800 bg-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 light:border-slate-200 light:bg-white p-4 sm:p-5">
            <p className="text-xs text-zinc-500 dark:text-zinc-500 light:text-slate-500">{label}</p>
            <p className="text-xl sm:text-2xl font-bold text-zinc-100 dark:text-zinc-100 light:text-slate-900 mt-1">{value}</p>
            <p className={`flex items-center gap-1 text-xs font-medium mt-1.5 ${positive ? 'text-emerald-400' : 'text-rose-400'}`}>
              {positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
              {change > 0 ? '+' : ''}{change}% vs last period
            </p>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
        <div className="lg:col-span-2">
          <MonthlyTargets />
        </div>
        <WinLossChart />
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <TeamPerformance />
        <LeadSources />
      </div>
    </div>
  )
}
