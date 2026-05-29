'use client'

import { useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { contacts as SEED, getAvatarColor, type Contact, type ContactStatus } from '@/lib/mock-data'
import { formatCurrency, formatRelativeDate, initials, cn } from '@/lib/utils'
import { Search, Plus, ChevronUp, ChevronDown, Mail, Phone, Pencil, Trash2, ExternalLink } from 'lucide-react'
import { ContactModal } from '@/components/contacts/contact-modal'
import { ToastContainer, type ToastData } from '@/components/ui/toast'

const STATUS_BADGE: Record<ContactStatus, string> = {
  Lead:     'bg-indigo-500/10 text-indigo-400',
  Prospect: 'bg-violet-500/10 text-violet-400',
  Customer: 'bg-emerald-500/10 text-emerald-400',
  Churned:  'bg-zinc-500/10  text-zinc-400',
}

const FILTERS: (ContactStatus | 'All')[] = ['All', 'Lead', 'Prospect', 'Customer', 'Churned']
type SortKey = 'name' | 'company' | 'status' | 'value' | 'lastContact'

export default function ContactsPage() {
  /* ── Data state ── */
  const [list, setList]   = useState<Contact[]>(SEED)
  const [modal, setModal] = useState<{ open: boolean; editing: Contact | null }>({ open: false, editing: null })
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)
  const [toasts, setToasts] = useState<ToastData[]>([])

  /* ── Filters / sort ── */
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<ContactStatus | 'All'>('All')
  const [sortKey, setSortKey] = useState<SortKey>('name')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  /* ── Toast helper ── */
  const toast = useCallback((type: 'success' | 'error', message: string) => {
    const id = Date.now().toString()
    setToasts(prev => [...prev, { id, type, message }])
  }, [])
  const dismissToast = useCallback((id: string) => setToasts(p => p.filter(t => t.id !== id)), [])

  /* ── CRUD ── */
  function openAdd()              { setModal({ open: true, editing: null }) }
  function openEdit(c: Contact)   { setModal({ open: true, editing: c }) }
  function closeModal()           { setModal({ open: false, editing: null }) }

  function handleSave(data: Omit<Contact, 'id' | 'avatar' | 'value' | 'lastContact' | 'createdAt'>) {
    if (modal.editing) {
      setList(prev => prev.map(c => c.id === modal.editing!.id ? { ...c, ...data } : c))
      toast('success', `${data.name} updated successfully`)
    } else {
      const newContact: Contact = {
        id: `c${Date.now()}`, avatar: '', value: 0,
        lastContact: new Date().toISOString().slice(0, 10),
        createdAt:   new Date().toISOString().slice(0, 10),
        ...data,
      }
      setList(prev => [newContact, ...prev])
      toast('success', `${data.name} added to contacts`)
    }
  }

  function handleDelete(id: string) {
    const name = list.find(c => c.id === id)?.name ?? 'Contact'
    setList(prev => prev.filter(c => c.id !== id))
    setConfirmDelete(null)
    toast('success', `${name} removed`)
  }

  /* ── Filtered / sorted list ── */
  const filtered = useMemo(() => {
    let l = list
    if (search) {
      const q = search.toLowerCase()
      l = l.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q)
      )
    }
    if (statusFilter !== 'All') l = l.filter(c => c.status === statusFilter)
    return [...l].sort((a, b) => {
      let va: string | number = a[sortKey] as string | number
      let vb: string | number = b[sortKey] as string | number
      if (sortKey === 'lastContact') {
        va = new Date(va as string).getTime()
        vb = new Date(vb as string).getTime()
      }
      if (va < vb) return sortDir === 'asc' ? -1 : 1
      if (va > vb) return sortDir === 'asc' ?  1 : -1
      return 0
    })
  }, [list, search, statusFilter, sortKey, sortDir])

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  function SortIcon({ k }: { k: SortKey }) {
    if (sortKey !== k) return <ChevronUp size={11} className="opacity-20" />
    return sortDir === 'asc'
      ? <ChevronUp size={11} className="text-violet-400" />
      : <ChevronDown size={11} className="text-violet-400" />
  }

  /* ── Column config ── */
  const cols: { label: string; k: SortKey }[] = [
    { label: 'Name',         k: 'name' },
    { label: 'Company',      k: 'company' },
    { label: 'Status',       k: 'status' },
    { label: 'Value',        k: 'value' },
    { label: 'Last Contact', k: 'lastContact' },
  ]

  return (
    <div className="max-w-7xl space-y-5">

      {/* ── Toolbar ── */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="flex items-center gap-2 px-3 h-9 flex-1 min-w-48 max-w-72 rounded-lg bg-zinc-900 border border-zinc-800 dark:bg-zinc-900 dark:border-zinc-800 light:bg-white light:border-slate-200">
          <Search size={13} className="text-zinc-500 flex-shrink-0" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search contacts…"
            className="flex-1 text-sm bg-transparent text-zinc-300 dark:text-zinc-300 light:text-slate-700 placeholder-zinc-600 dark:placeholder-zinc-600 light:placeholder-slate-400 outline-none"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-zinc-600 hover:text-zinc-400 text-xs">✕</button>
          )}
        </div>

        {/* Status filters */}
        <div className="flex items-center gap-1.5">
          {FILTERS.map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={cn(
                'px-3 h-9 rounded-lg text-xs font-medium transition-colors',
                statusFilter === s
                  ? 'bg-violet-600 text-white shadow-sm shadow-violet-900/30'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 dark:bg-zinc-900 dark:border-zinc-800 light:bg-white light:border-slate-200 light:text-slate-600 light:hover:bg-slate-100',
              )}>
              {s}
            </button>
          ))}
        </div>

        {/* Add button */}
        <button onClick={openAdd}
          className="ml-auto flex items-center gap-2 px-4 h-9 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold transition-colors shadow-sm shadow-violet-900/30">
          <Plus size={14} />Add Contact
        </button>
      </div>

      {/* ── Table ── */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 light:border-slate-200 light:bg-white overflow-hidden">

        {/* Count bar */}
        <div className="px-5 py-3 border-b border-zinc-800 dark:border-zinc-800 light:border-slate-200 flex items-center gap-3">
          <span className="text-xs text-zinc-500 dark:text-zinc-500 light:text-slate-500">
            {filtered.length} of {list.length} contact{list.length !== 1 ? 's' : ''}
          </span>
          {search && (
            <span className="text-xs text-violet-400">matching &ldquo;{search}&rdquo;</span>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 dark:border-zinc-800 light:border-slate-200">
                {cols.map(({ label, k }) => (
                  <th key={k} className="px-5 py-3 text-left">
                    <button onClick={() => handleSort(k)}
                      className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-500 light:text-slate-500 hover:text-zinc-200 dark:hover:text-zinc-200 light:hover:text-slate-800 transition-colors">
                      {label}<SortIcon k={k} />
                    </button>
                  </th>
                ))}
                <th className="px-5 py-3 text-right">
                  <span className="text-xs font-medium text-zinc-500 dark:text-zinc-500 light:text-slate-500">Actions</span>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-800/60 dark:divide-zinc-800/60 light:divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-16 text-center">
                    <p className="text-sm text-zinc-500 dark:text-zinc-500 light:text-slate-500">No contacts found</p>
                    {search && (
                      <button onClick={() => setSearch('')}
                        className="mt-2 text-xs text-violet-400 hover:underline">
                        Clear search
                      </button>
                    )}
                  </td>
                </tr>
              ) : filtered.map(contact => (
                <tr key={contact.id}
                  className="group hover:bg-zinc-800/40 dark:hover:bg-zinc-800/40 light:hover:bg-slate-50 transition-colors">

                  {/* Name */}
                  <td className="px-5 py-3.5">
                    <Link href={`/contacts/${contact.id}`} className="flex items-center gap-3">
                      <div className={cn('w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0', getAvatarColor(contact.id))}>
                        {initials(contact.name)}
                      </div>
                      <div>
                        <p className="font-medium text-zinc-100 dark:text-zinc-100 light:text-slate-900 group-hover:text-violet-400 transition-colors">{contact.name}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-500 light:text-slate-500">{contact.title}</p>
                      </div>
                    </Link>
                  </td>

                  {/* Company */}
                  <td className="px-5 py-3.5 text-xs text-zinc-400 dark:text-zinc-400 light:text-slate-600">{contact.company}</td>

                  {/* Status */}
                  <td className="px-5 py-3.5">
                    <span className={cn('text-[11px] font-medium px-2.5 py-1 rounded-full', STATUS_BADGE[contact.status])}>
                      {contact.status}
                    </span>
                  </td>

                  {/* Value */}
                  <td className="px-5 py-3.5 text-xs font-semibold text-zinc-300 dark:text-zinc-300 light:text-slate-700 tabular-nums">
                    {contact.value > 0 ? formatCurrency(contact.value) : <span className="text-zinc-600 dark:text-zinc-600 light:text-slate-400 font-normal">—</span>}
                  </td>

                  {/* Last contact */}
                  <td className="px-5 py-3.5 text-xs text-zinc-500 dark:text-zinc-500 light:text-slate-500">
                    {formatRelativeDate(contact.lastContact)}
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-3.5">
                    {confirmDelete === contact.id ? (
                      <div className="flex items-center gap-2 justify-end">
                        <span className="text-xs text-zinc-400">Delete?</span>
                        <button onClick={() => handleDelete(contact.id)}
                          className="px-2.5 py-1 rounded-md text-xs font-medium bg-rose-600 hover:bg-rose-500 text-white transition-colors">
                          Yes
                        </button>
                        <button onClick={() => setConfirmDelete(null)}
                          className="px-2.5 py-1 rounded-md text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700 transition-colors">
                          No
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity justify-end">
                        <a href={`mailto:${contact.email}`} title="Send email"
                          className="p-1.5 rounded-md text-zinc-500 hover:text-blue-400 hover:bg-zinc-700 transition-colors"><Mail size={13} /></a>
                        <a href={`tel:${contact.phone}`} title="Call"
                          className="p-1.5 rounded-md text-zinc-500 hover:text-emerald-400 hover:bg-zinc-700 transition-colors"><Phone size={13} /></a>
                        <button onClick={() => openEdit(contact)} title="Edit"
                          className="p-1.5 rounded-md text-zinc-500 hover:text-violet-400 hover:bg-zinc-700 transition-colors"><Pencil size={13} /></button>
                        <Link href={`/contacts/${contact.id}`} title="View detail"
                          className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-200 hover:bg-zinc-700 transition-colors"><ExternalLink size={13} /></Link>
                        <button onClick={() => setConfirmDelete(contact.id)} title="Delete"
                          className="p-1.5 rounded-md text-zinc-500 hover:text-rose-400 hover:bg-zinc-700 transition-colors"><Trash2 size={13} /></button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Modal ── */}
      <ContactModal
        open={modal.open}
        onClose={closeModal}
        onSave={handleSave}
        initial={modal.editing}
      />

      {/* ── Toasts ── */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  )
}
