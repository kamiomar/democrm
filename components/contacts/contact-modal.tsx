'use client'

import { useState, useEffect } from 'react'
import { Modal } from '@/components/ui/modal'
import { team, type Contact, type ContactStatus } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const STATUS_OPTIONS: ContactStatus[] = ['Lead', 'Prospect', 'Customer', 'Churned']

interface Props {
  open: boolean
  onClose: () => void
  onSave: (data: Omit<Contact, 'id' | 'avatar' | 'value' | 'lastContact' | 'createdAt'>) => void
  initial?: Contact | null
}

const BLANK = {
  name: '', email: '', phone: '', company: '', title: '',
  status: 'Lead' as ContactStatus, location: '', website: '',
  owner: 'Alex Chen', tags: '',
}

export function ContactModal({ open, onClose, onSave, initial }: Props) {
  const [form, setForm] = useState(BLANK)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (open) {
      setErrors({})
      setForm(initial
        ? { ...initial, tags: initial.tags.join(', ') }
        : BLANK
      )
    }
  }, [open, initial])

  function set(key: keyof typeof BLANK, value: string) {
    setForm(f => ({ ...f, [key]: value }))
    if (errors[key]) setErrors(e => { const n = { ...e }; delete n[key]; return n })
  }

  function validate() {
    const e: Record<string, string> = {}
    if (!form.name.trim())    e.name    = 'Required'
    if (!form.email.trim())   e.email   = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email'
    if (!form.company.trim()) e.company = 'Required'
    return e
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    onSave({ ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) })
    onClose()
  }

  const label = 'block text-xs font-medium mb-1.5 text-zinc-400 dark:text-zinc-400 light:text-slate-500'
  const input = cn(
    'w-full px-3 h-9 rounded-lg text-sm outline-none transition-all',
    'bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-600',
    'dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100 dark:placeholder-zinc-600',
    'light:bg-slate-50 light:border-slate-200 light:text-slate-900 light:placeholder-slate-400',
    'focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10',
  )
  const err = 'text-[10px] text-rose-400 mt-1'

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initial ? 'Edit Contact' : 'New Contact'}
      subtitle={initial ? `Editing ${initial.name}` : 'Fill in the details to add a new contact'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-2 gap-x-4 gap-y-4">
          {/* Name */}
          <div>
            <label className={label}>Full Name <span className="text-rose-400">*</span></label>
            <input value={form.name} onChange={e => set('name', e.target.value)}
              className={cn(input, errors.name && 'border-rose-500 focus:border-rose-500')}
              placeholder="Sophia Harrington" />
            {errors.name && <p className={err}>{errors.name}</p>}
          </div>

          {/* Company */}
          <div>
            <label className={label}>Company <span className="text-rose-400">*</span></label>
            <input value={form.company} onChange={e => set('company', e.target.value)}
              className={cn(input, errors.company && 'border-rose-500 focus:border-rose-500')}
              placeholder="Acme Inc." />
            {errors.company && <p className={err}>{errors.company}</p>}
          </div>

          {/* Email */}
          <div>
            <label className={label}>Email <span className="text-rose-400">*</span></label>
            <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
              className={cn(input, errors.email && 'border-rose-500 focus:border-rose-500')}
              placeholder="sophia@acme.com" />
            {errors.email && <p className={err}>{errors.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className={label}>Phone</label>
            <input value={form.phone} onChange={e => set('phone', e.target.value)}
              className={input} placeholder="+1 (415) 555-0100" />
          </div>

          {/* Title */}
          <div>
            <label className={label}>Job Title</label>
            <input value={form.title} onChange={e => set('title', e.target.value)}
              className={input} placeholder="VP of Engineering" />
          </div>

          {/* Status */}
          <div>
            <label className={label}>Status</label>
            <select value={form.status} onChange={e => set('status', e.target.value)}
              className={input}>
              {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Location */}
          <div>
            <label className={label}>Location</label>
            <input value={form.location} onChange={e => set('location', e.target.value)}
              className={input} placeholder="San Francisco, CA" />
          </div>

          {/* Website */}
          <div>
            <label className={label}>Website</label>
            <input value={form.website} onChange={e => set('website', e.target.value)}
              className={input} placeholder="acme.com" />
          </div>

          {/* Owner */}
          <div>
            <label className={label}>Assigned To</label>
            <select value={form.owner} onChange={e => set('owner', e.target.value)}
              className={input}>
              {team.map(m => <option key={m.id} value={m.name}>{m.name} ({m.role})</option>)}
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className={label}>Tags <span className="text-zinc-600 dark:text-zinc-600 light:text-slate-400 font-normal">(comma-separated)</span></label>
            <input value={form.tags} onChange={e => set('tags', e.target.value)}
              className={input} placeholder="Enterprise, SaaS, High Value" />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 mt-6 pt-5 border-t border-zinc-800 dark:border-zinc-800 light:border-slate-200">
          <button type="button" onClick={onClose}
            className="flex-1 h-9 rounded-lg text-sm font-medium transition-colors bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-200 light:bg-slate-100 light:text-slate-600 light:hover:bg-slate-200">
            Cancel
          </button>
          <button type="submit"
            className="flex-1 h-9 rounded-lg text-sm font-semibold transition-colors bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-900/20">
            {initial ? 'Save Changes' : '+ Add Contact'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
