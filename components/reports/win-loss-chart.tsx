'use client'

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { deals } from '@/lib/mock-data'

const won  = deals.filter(d => d.stage === 'won').length
const lost = deals.filter(d => d.stage === 'lost').length
const open = deals.filter(d => d.stage !== 'won' && d.stage !== 'lost').length

const data = [
  { name: 'Won',  value: won,  color: '#10b981' },
  { name: 'Open', value: open, color: '#8b5cf6' },
  { name: 'Lost', value: lost, color: '#f43f5e' },
]

export function WinLossChart() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isDark = !mounted || theme === 'dark'
  const tooltipBg     = isDark ? '#18181b' : '#ffffff'
  const tooltipBorder = isDark ? '#3f3f46' : '#e2e8f0'

  const winRate = Math.round((won / deals.length) * 100)

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 light:border-slate-200 light:bg-white p-5">
      <h3 className="text-sm font-semibold text-zinc-100 dark:text-zinc-100 light:text-slate-900">Win / Loss Ratio</h3>
      <p className="text-xs text-zinc-500 dark:text-zinc-500 light:text-slate-500 mt-0.5">All-time deal outcomes</p>

      <div className="flex items-center gap-6 mt-4">
        <ResponsiveContainer width={140} height={140}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={42} outerRadius={62} paddingAngle={3} dataKey="value">
              {data.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Pie>
            <Tooltip
              contentStyle={{ background: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: 8, fontSize: 12 }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="flex-1 space-y-3">
          {data.map(d => (
            <div key={d.name} className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
              <span className="text-xs text-zinc-400 dark:text-zinc-400 light:text-slate-600 flex-1">{d.name}</span>
              <span className="text-xs font-semibold text-zinc-200 dark:text-zinc-200 light:text-slate-800 tabular-nums">{d.value}</span>
            </div>
          ))}
          <div className="pt-2 border-t border-zinc-800 dark:border-zinc-800 light:border-slate-200">
            <p className="text-xs text-zinc-500 dark:text-zinc-500 light:text-slate-500">Win rate</p>
            <p className="text-2xl font-bold text-emerald-400 mt-0.5">{winRate}%</p>
          </div>
        </div>
      </div>
    </div>
  )
}
