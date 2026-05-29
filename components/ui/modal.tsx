'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export function Modal({ open, onClose, title, subtitle, size = 'md', children }: ModalProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  const widths = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl' }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Panel */}
      <div className={cn(
        'relative z-10 w-full rounded-2xl shadow-2xl modal-enter',
        'bg-zinc-900 border border-zinc-800',
        'dark:bg-zinc-900 dark:border-zinc-800',
        'light:bg-white light:border-slate-200',
        widths[size],
      )}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 dark:border-zinc-800 light:border-slate-200">
          <div>
            <h2 className="text-sm font-semibold text-zinc-100 dark:text-zinc-100 light:text-slate-900">{title}</h2>
            {subtitle && (
              <p className="text-xs text-zinc-500 dark:text-zinc-500 light:text-slate-500 mt-0.5">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-7 h-7 rounded-lg transition-colors text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 dark:text-zinc-500 dark:hover:text-zinc-200 dark:hover:bg-zinc-800 light:text-slate-400 light:hover:text-slate-900 light:hover:bg-slate-100"
          >
            <X size={14} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
