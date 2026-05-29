'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { revenueData } from '@/lib/mock-data'

export function MonthlyTargets() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isDark        = !mounted || theme === 'dark'
  const gridColor     = isDark ? '#27272a' : '#e2e8f0'
  const textColor     = isDark ? '#71717a' : '#94a3b8'
  const tooltipBg     = isDark ? '#18181b' : '#ffffff'
  const tooltipBorder = isDark ? '#3f3f46' : '#e2e8f0'

  const data = revenueData.map(r => ({
    ...r,
    hit: r.revenue >= r.target,
    gap: r.revenue - r.target,
  }))

  const hitCount  = data.filter(d => d.hit).length
  const missCount = data.length - hitCount

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 light:border-slate-200 light:bg-white p-5">
      <div className="flex items-center justify-between mb-1">
        <div>
          <h3 className="text-sm font-semibold text-zinc-100 dark:text-zinc-100 light:text-slate-900">Monthly vs Target</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-500 light:text-slate-500 mt-0.5">Revenue vs quota — last 12 months</p>
        </div>
        <div className="flex gap-3 text-xs">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />{hitCount} hit
          </span>
          <span className="flex items-center gap-1.5 text-rose-400">
            <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />{missCount} missed
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220} className="mt-4">
        <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barSize={18}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 10, fill: textColor }} axisLine={false} tickLine={false} interval={1} />
          <YAxis tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 10, fill: textColor }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: 8, fontSize: 12, color: isDark ? '#e4e4e7' : '#0f172a' }}
            formatter={(v: number, name: string) => [`$${v.toLocaleString()}`, name === 'revenue' ? 'Revenue' : 'Target']}
          />
          <Bar dataKey="target" fill={isDark ? '#3f3f46' : '#e2e8f0'} radius={[3, 3, 0, 0]} name="target" />
          <Bar dataKey="revenue" radius={[3, 3, 0, 0]} name="revenue">
            {data.map((entry, i) => (
              <rect key={i} fill={entry.hit ? '#10b981' : '#f43f5e'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
