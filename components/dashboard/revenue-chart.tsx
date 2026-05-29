'use client'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { revenueData } from '@/lib/mock-data'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

function formatK(v: number) {
  return `$${(v / 1000).toFixed(0)}k`
}

export function RevenueChart() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const isDark = !mounted || theme === 'dark'
  const gridColor = isDark ? '#27272a' : '#e2e8f0'
  const textColor = isDark ? '#71717a' : '#94a3b8'
  const tooltipBg = isDark ? '#18181b' : '#ffffff'
  const tooltipBorder = isDark ? '#3f3f46' : '#e2e8f0'

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 light:border-slate-200 light:bg-white p-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-zinc-100 dark:text-zinc-100 light:text-slate-900">Revenue Overview</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-500 light:text-slate-500 mt-0.5">Last 12 months</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5 text-zinc-400 dark:text-zinc-400 light:text-slate-500">
            <span className="w-2.5 h-0.5 rounded-full bg-violet-500 inline-block" />Revenue
          </span>
          <span className="flex items-center gap-1.5 text-zinc-400 dark:text-zinc-400 light:text-slate-500">
            <span className="w-2.5 h-0.5 rounded-full bg-zinc-600 inline-block" />Target
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#52525b" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#52525b" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: textColor }} axisLine={false} tickLine={false} interval={1} />
          <YAxis tickFormatter={formatK} tick={{ fontSize: 11, fill: textColor }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: 8, fontSize: 12, color: isDark ? '#e4e4e7' : '#0f172a' }}
            formatter={(v) => [`$${Number(v ?? 0).toLocaleString()}`, '']}
          />
          <Area type="monotone" dataKey="target" stroke="#52525b" strokeWidth={1.5} strokeDasharray="4 4" fill="url(#colorTarget)" dot={false} name="Target" />
          <Area type="monotone" dataKey="revenue" stroke="#7c3aed" strokeWidth={2} fill="url(#colorRevenue)" dot={false} activeDot={{ r: 4, fill: '#7c3aed' }} name="Revenue" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
