'use client'

import { useState, useCallback } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
  useDraggable,
} from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { deals as initialDeals, stageLabels, type Deal, type DealStage } from '@/lib/mock-data'
import { formatCurrency, formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'
import { Plus, GripVertical } from 'lucide-react'

const stages: DealStage[] = ['new', 'qualified', 'proposal', 'negotiation', 'won']

const stageColors: Record<DealStage, string> = {
  new: 'bg-indigo-500',
  qualified: 'bg-violet-500',
  proposal: 'bg-amber-500',
  negotiation: 'bg-orange-500',
  won: 'bg-emerald-500',
  lost: 'bg-rose-500',
}

const priorityBadge = {
  High: 'bg-rose-500/10 text-rose-400',
  Medium: 'bg-amber-500/10 text-amber-400',
  Low: 'bg-zinc-500/10 text-zinc-500',
}

function DealCard({ deal, isDragging }: { deal: Deal; isDragging?: boolean }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: deal.id })

  const style = { transform: CSS.Translate.toString(transform) }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'rounded-lg border border-zinc-800 dark:border-zinc-800 light:border-slate-200 bg-zinc-900 dark:bg-zinc-900 light:bg-white p-3 cursor-grab active:cursor-grabbing select-none transition-all',
        isDragging ? 'opacity-0' : 'hover:border-zinc-700 dark:hover:border-zinc-700 light:hover:border-slate-300 hover:shadow-lg hover:shadow-black/20'
      )}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-zinc-100 dark:text-zinc-100 light:text-slate-900 truncate">{deal.company}</p>
          <p className="text-[10px] text-zinc-500 dark:text-zinc-500 light:text-slate-500 truncate mt-0.5">{deal.contactName}</p>
        </div>
        <GripVertical size={12} className="text-zinc-700 dark:text-zinc-700 light:text-slate-300 flex-shrink-0 mt-0.5" />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-zinc-100 dark:text-zinc-100 light:text-slate-900">{formatCurrency(deal.value)}</span>
        <span className={cn('text-[10px] font-medium px-2 py-0.5 rounded-full', priorityBadge[deal.priority])}>
          {deal.priority}
        </span>
      </div>

      <div className="mt-2.5 flex items-center justify-between">
        <span className="text-[10px] text-zinc-600 dark:text-zinc-600 light:text-slate-400">Close: {formatDate(deal.closeDate)}</span>
        <div className="flex items-center gap-1">
          <div className="w-12 h-1 rounded-full bg-zinc-800 dark:bg-zinc-800 light:bg-slate-200 overflow-hidden">
            <div className="h-full rounded-full bg-violet-500" style={{ width: `${deal.probability}%` }} />
          </div>
          <span className="text-[10px] text-zinc-600 dark:text-zinc-600 light:text-slate-400">{deal.probability}%</span>
        </div>
      </div>
    </div>
  )
}

function DragPreview({ deal }: { deal: Deal }) {
  return (
    <div className="rounded-lg border border-violet-500/40 bg-zinc-900 dark:bg-zinc-900 light:bg-white p-3 shadow-2xl shadow-black/40 rotate-1 opacity-95 w-52">
      <p className="text-xs font-semibold text-zinc-100 dark:text-zinc-100 light:text-slate-900 truncate">{deal.company}</p>
      <p className="text-[10px] text-zinc-500 dark:text-zinc-500 light:text-slate-500 mt-0.5">{deal.contactName}</p>
      <p className="text-sm font-bold text-zinc-100 dark:text-zinc-100 light:text-slate-900 mt-2">{formatCurrency(deal.value)}</p>
    </div>
  )
}

function Column({ stage, deals }: { stage: DealStage; deals: Deal[] }) {
  const { setNodeRef, isOver } = useDroppable({ id: stage })
  const totalValue = deals.reduce((s, d) => s + d.value, 0)

  return (
    <div className="flex flex-col min-w-[220px] w-[220px]">
      {/* Column header */}
      <div className="flex items-center gap-2 mb-3">
        <div className={cn('w-2 h-2 rounded-full', stageColors[stage])} />
        <span className="text-xs font-semibold text-zinc-300 dark:text-zinc-300 light:text-slate-700">{stageLabels[stage]}</span>
        <span className="ml-auto text-xs text-zinc-600 dark:text-zinc-600 light:text-slate-400 tabular-nums">{deals.length}</span>
      </div>
      <div className="mb-2">
        <span className="text-[10px] text-zinc-600 dark:text-zinc-600 light:text-slate-400 font-medium">{formatCurrency(totalValue)}</span>
      </div>

      {/* Drop zone */}
      <div
        ref={setNodeRef}
        className={cn(
          'flex-1 min-h-[480px] rounded-xl border-2 border-dashed p-2 space-y-2 transition-colors',
          isOver
            ? 'border-violet-500/60 bg-violet-500/5'
            : 'border-zinc-800 dark:border-zinc-800 light:border-slate-200 bg-zinc-900/30 dark:bg-zinc-900/30 light:bg-slate-50'
        )}
      >
        {deals.map(deal => (
          <DealCard key={deal.id} deal={deal} />
        ))}
        <button className="w-full flex items-center justify-center gap-1.5 h-8 rounded-lg border border-dashed border-zinc-800 dark:border-zinc-800 light:border-slate-200 text-xs text-zinc-600 dark:text-zinc-600 light:text-slate-400 hover:text-zinc-400 dark:hover:text-zinc-400 light:hover:text-slate-600 hover:border-zinc-700 dark:hover:border-zinc-700 light:hover:border-slate-300 transition-colors">
          <Plus size={12} /> Add deal
        </button>
      </div>
    </div>
  )
}

type GroupedDeals = Record<DealStage, Deal[]>

function group(ds: Deal[]): GroupedDeals {
  const g: GroupedDeals = { new: [], qualified: [], proposal: [], negotiation: [], won: [], lost: [] }
  ds.forEach(d => g[d.stage].push(d))
  return g
}

export function KanbanBoard() {
  const [dealList, setDealList] = useState<Deal[]>(initialDeals.filter(d => d.stage !== 'lost'))
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  const grouped = group(dealList)
  const activeDeal = activeId ? dealList.find(d => d.id === activeId) : null

  const handleDragStart = useCallback((e: DragStartEvent) => {
    setActiveId(e.active.id as string)
  }, [])

  const handleDragEnd = useCallback((e: DragEndEvent) => {
    const { active, over } = e
    setActiveId(null)
    if (!over) return
    const targetStage = over.id as DealStage
    setDealList(prev => prev.map(d => d.id === active.id ? { ...d, stage: targetStage } : d))
  }, [])

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map(stage => (
          <Column key={stage} stage={stage} deals={grouped[stage]} />
        ))}
      </div>
      <DragOverlay>
        {activeDeal ? <DragPreview deal={activeDeal} /> : null}
      </DragOverlay>
    </DndContext>
  )
}
