'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { team, contacts, deals } from '@/lib/mock-data'
import { formatCurrency } from '@/lib/utils'

function buildData() {
  return team.map(m => {
    const myContacts = contacts.filter(c => c.owner === m.name)
    const myDeals    = deals.filter(d => d.owner === m.name)
    const wonValue   = myDeals.filter(d => d.stage === 'won').reduce((s, d) => s + d.value, 0)
    const openDeals  = myDeals.filter(d => d.stage !== 'won' && d.stage !== 'lost').length
    return { name: m.name.split(' ')[0], contacts: myContacts.length, wonValue, openDeals, role: m.role }
  })
}

export function TeamPerformance() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isDark        = !mounted || theme === 'dark'
  const gridColor     = isDark ? '#27272a' : '#e2e8f0'
  const textColor     = isDark ? '#71717a' : '#94a3b8'
  const tooltipBg     = isDark ? '#18181b' : '#ffffff'
  const tooltipBorder = isDark ? '#3f3f46' : '#e2e8f0'

  const data = buildData()

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 light:border-slate-200 light:bg-white p-5">
      <h3 className="text-sm font-semibold text-zinc-100 dark:text-zinc-100 light:text-slate-900">Team Performance</h3>
      <p className="text-xs text-zinc-500 dark:text-zinc-500 light:text-slate-500 mt-0.5">Revenue closed per rep</p>

      <ResponsiveContainer width="100%" height={200} className="mt-5">
        <BarChart data={data} margin={{ top: 4, right: 4, left: -16, bottom: 0 }} barSize={40}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: textColor }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11, fill: textColor }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: 8, fontSize: 12, color: isDark ? '#e4e4e7' : '#0f172a' }}
            formatter={(v: number) => [formatCurrency(v), 'Revenue Closed']}
          />
          <Bar dataKey="wonValue" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      {/* Per-rep stats */}
      <div className="mt-4 space-y-2.5">
        {data.map(rep => (
          <div key={rep.name} className="flex items-center gap-3 text-xs">
            <span className="text-zinc-400 dark:text-zinc-400 light:text-slate-600 w-14">{rep.name}</span>
            <div className="flex-1 h-1.5 rounded-full bg-zinc-800 dark:bg-zinc-800 light:bg-slate-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-violet-500"
                style={{ width: `${Math.min(100, (rep.wonValue / 400000) * 100)}%` }}
              />
            </div>
            <span className="text-zinc-300 dark:text-zinc-300 light:text-slate-700 font-medium tabular-nums w-20 text-right">
              {formatCurrency(rep.wonValue)}
            </span>
            <span className="text-zinc-600 dark:text-zinc-600 light:text-slate-400 tabular-nums w-16 text-right">
              {rep.openDeals} open
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
