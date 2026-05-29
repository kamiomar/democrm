'use client'

import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const data = [
  { source: 'Outbound',   deals: 8,  value: 320000 },
  { source: 'Referral',   deals: 5,  value: 280000 },
  { source: 'Inbound',    deals: 4,  value: 145000 },
  { source: 'LinkedIn',   deals: 3,  value: 92000  },
  { source: 'Conference', deals: 2,  value: 67000  },
  { source: 'Partners',   deals: 2,  value: 74000  },
]

export function LeadSources() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isDark        = !mounted || theme === 'dark'
  const gridColor     = isDark ? '#3f3f46' : '#e2e8f0'
  const textColor     = isDark ? '#71717a' : '#94a3b8'
  const tooltipBg     = isDark ? '#18181b' : '#ffffff'
  const tooltipBorder = isDark ? '#3f3f46' : '#e2e8f0'

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 light:border-slate-200 light:bg-white p-5">
      <h3 className="text-sm font-semibold text-zinc-100 dark:text-zinc-100 light:text-slate-900">Lead Sources</h3>
      <p className="text-xs text-zinc-500 dark:text-zinc-500 light:text-slate-500 mt-0.5">Deals by acquisition channel</p>

      <ResponsiveContainer width="100%" height={220} className="mt-2">
        <RadarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
          <PolarGrid stroke={gridColor} />
          <PolarAngleAxis dataKey="source" tick={{ fontSize: 10, fill: textColor }} />
          <Tooltip
            contentStyle={{ background: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: 8, fontSize: 12 }}
            formatter={(v: number) => [v, 'Deals']}
          />
          <Radar name="Deals" dataKey="deals" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} strokeWidth={2} />
        </RadarChart>
      </ResponsiveContainer>

      <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-2">
        {data.map(s => (
          <div key={s.source} className="flex items-center justify-between text-xs">
            <span className="text-zinc-400 dark:text-zinc-400 light:text-slate-600">{s.source}</span>
            <span className="font-medium text-zinc-200 dark:text-zinc-200 light:text-slate-800">{s.deals} deals</span>
          </div>
        ))}
      </div>
    </div>
  )
}
