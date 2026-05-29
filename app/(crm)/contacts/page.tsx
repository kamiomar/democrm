'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { contacts, getAvatarColor, type ContactStatus } from '@/lib/mock-data'
import { formatCurrency, formatRelativeDate, initials, cn } from '@/lib/utils'
import { Search, Plus, ChevronUp, ChevronDown, Mail, Phone, ExternalLink } from 'lucide-react'

const statusBadge: Record<ContactStatus, string> = {
  Lead: 'bg-indigo-500/10 text-indigo-400',
  Prospect: 'bg-violet-500/10 text-violet-400',
  Customer: 'bg-emerald-500/10 text-emerald-400',
  Churned: 'bg-zinc-500/10 text-zinc-400',
}

const statusFilters: (ContactStatus | 'All')[] = ['All', 'Lead', 'Prospect', 'Customer', 'Churned']

type SortKey = 'name' | 'company' | 'status' | 'value' | 'lastContact'

export default function ContactsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<ContactStatus | 'All'>('All')
  const [sortKey, setSortKey] = useState<SortKey>('name')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  const filtered = useMemo(() => {
    let list = contacts
    if (search) {
      const q = search.toLowerCase()
      list = list.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q)
      )
    }
    if (statusFilter !== 'All') list = list.filter(c => c.status === statusFilter)
    list = [...list].sort((a, b) => {
      let va: string | number = a[sortKey] as string | number
      let vb: string | number = b[sortKey] as string | number
      if (sortKey === 'lastContact') { va = new Date(va as string).getTime(); vb = new Date(vb as string).getTime() }
      if (va < vb) return sortDir === 'asc' ? -1 : 1
      if (va > vb) return sortDir === 'asc' ? 1 : -1
      return 0
    })
    return list
  }, [search, statusFilter, sortKey, sortDir])

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  function SortIcon({ k }: { k: SortKey }) {
    if (sortKey !== k) return <ChevronUp size={12} className="opacity-20" />
    return sortDir === 'asc' ? <ChevronUp size={12} className="text-violet-400" /> : <ChevronDown size={12} className="text-violet-400" />
  }

  return (
    <div className="max-w-7xl space-y-5">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 px-3 h-9 flex-1 min-w-48 max-w-72 rounded-lg bg-zinc-900 border border-zinc-800 dark:bg-zinc-900 dark:border-zinc-800 light:bg-white light:border-slate-200">
          <Search size={13} className="text-zinc-500 flex-shrink-0" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search contacts…"
            className="flex-1 text-sm bg-transparent text-zinc-300 dark:text-zinc-300 light:text-slate-700 placeholder-zinc-600 outline-none"
          />
        </div>
        <div className="flex items-center gap-1.5">
          {statusFilters.map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                'px-3 h-9 rounded-lg text-xs font-medium transition-colors',
                statusFilter === s
                  ? 'bg-violet-600 text-white'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 dark:bg-zinc-900 dark:border-zinc-800 light:bg-white light:border-slate-200 light:text-slate-600 light:hover:bg-slate-100'
              )}
            >
              {s}
            </button>
          ))}
        </div>
        <button className="ml-auto flex items-center gap-2 px-4 h-9 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium transition-colors">
          <Plus size={14} />
          Add Contact
        </button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 light:border-slate-200 light:bg-white overflow-hidden">
        {/* Count */}
        <div className="px-5 py-3 border-b border-zinc-800 dark:border-zinc-800 light:border-slate-200 flex items-center gap-2">
          <span className="text-xs text-zinc-500 dark:text-zinc-500 light:text-slate-500">
            {filtered.length} contact{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 dark:border-zinc-800 light:border-slate-200">
                {[
                  { label: 'Name', k: 'name' as SortKey },
                  { label: 'Company', k: 'company' as SortKey },
                  { label: 'Status', k: 'status' as SortKey },
                  { label: 'Value', k: 'value' as SortKey },
                  { label: 'Last Contact', k: 'lastContact' as SortKey },
                ].map(({ label, k }) => (
                  <th key={k} className="px-5 py-3 text-left">
                    <button onClick={() => handleSort(k)} className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-500 light:text-slate-500 hover:text-zinc-300 dark:hover:text-zinc-300 light:hover:text-slate-800 transition-colors">
                      {label}<SortIcon k={k} />
                    </button>
                  </th>
                ))}
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 dark:divide-zinc-800 light:divide-slate-100">
              {filtered.map(contact => (
                <tr key={contact.id} className="group hover:bg-zinc-800/40 dark:hover:bg-zinc-800/40 light:hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <Link href={`/contacts/${contact.id}`} className="flex items-center gap-3">
                      <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0', getAvatarColor(contact.id))}>
                        {initials(contact.name)}
                      </div>
                      <div>
                        <p className="font-medium text-zinc-100 dark:text-zinc-100 light:text-slate-900 hover:text-violet-400 transition-colors">{contact.name}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-500 light:text-slate-500">{contact.title}</p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-zinc-400 dark:text-zinc-400 light:text-slate-600">{contact.company}</td>
                  <td className="px-5 py-3.5">
                    <span className={cn('text-[11px] font-medium px-2.5 py-1 rounded-full', statusBadge[contact.status])}>
                      {contact.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs font-semibold text-zinc-300 dark:text-zinc-300 light:text-slate-700 tabular-nums">
                    {formatCurrency(contact.value)}
                  </td>
                  <td className="px-5 py-3.5 text-xs text-zinc-500 dark:text-zinc-500 light:text-slate-500">
                    {formatRelativeDate(contact.lastContact)}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a href={`mailto:${contact.email}`} className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-200 hover:bg-zinc-700 transition-colors"><Mail size={13} /></a>
                      <a href={`tel:${contact.phone}`} className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-200 hover:bg-zinc-700 transition-colors"><Phone size={13} /></a>
                      <Link href={`/contacts/${contact.id}`} className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-200 hover:bg-zinc-700 transition-colors"><ExternalLink size={13} /></Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
