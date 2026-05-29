'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { deals, stageLabels, type DealStage } from '@/lib/mock-data'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const stages: DealStage[] = ['new', 'qualified', 'proposal', 'negotiation', 'won']
const stageColors: Record<DealStage, string> = {
  new: '#6366f1',
  qualified: '#8b5cf6',
  proposal: '#a78bfa',
  negotiation: '#f59e0b',
  won: '#10b981',
  lost: '#f43f5e',
}

function buildData() {
  return stages.map(stage => {
    const stageDeals = deals.filter(d => d.stage === stage)
    return {
      stage: stageLabels[stage].replace(' ', '\n'),
      shortLabel: stageLabels[stage].split(' ')[0],
      count: stageDeals.length,
      value: stageDeals.reduce((s, d) => s + d.value, 0),
      color: stageColors[stage],
    }
  })
}

export function PipelineChart() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const isDark = !mounted || theme === 'dark'
  const gridColor = isDark ? '#27272a' : '#e2e8f0'
  const textColor = isDark ? '#71717a' : '#94a3b8'
  const tooltipBg = isDark ? '#18181b' : '#ffffff'
  const tooltipBorder = isDark ? '#3f3f46' : '#e2e8f0'

  const data = buildData()

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 light:border-slate-200 light:bg-white p-5">
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-zinc-100 dark:text-zinc-100 light:text-slate-900">Pipeline by Stage</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-500 light:text-slate-500 mt-0.5">Active deals count</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: -16, bottom: 0 }} barSize={32}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis dataKey="shortLabel" tick={{ fontSize: 11, fill: textColor }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: textColor }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: 8, fontSize: 12, color: isDark ? '#e4e4e7' : '#0f172a' }}
            formatter={(v, name) => [v ?? 0, name === 'count' ? 'Deals' : 'Value']}
          />
          <Bar dataKey="count" name="count" radius={[4, 4, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} fillOpacity={0.85} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
