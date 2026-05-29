'use client'

import { useEffect } from 'react'
import { CheckCircle, XCircle, X } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ToastData {
  id: string
  type: 'success' | 'error'
  message: string
}

export function Toast({ toast, onDismiss }: { toast: ToastData; onDismiss: (id: string) => void }) {
  useEffect(() => {
    const t = setTimeout(() => onDismiss(toast.id), 3500)
    return () => clearTimeout(t)
  }, [toast.id, onDismiss])

  return (
    <div className={cn(
      'flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl text-sm toast-enter',
      toast.type === 'success'
        ? 'bg-zinc-900 border-emerald-500/30 dark:bg-zinc-900 light:bg-white light:border-emerald-500/30'
        : 'bg-zinc-900 border-rose-500/30 dark:bg-zinc-900 light:bg-white light:border-rose-500/30',
    )}>
      {toast.type === 'success'
        ? <CheckCircle size={15} className="text-emerald-400 flex-shrink-0" />
        : <XCircle size={15} className="text-rose-400 flex-shrink-0" />
      }
      <span className="text-zinc-200 dark:text-zinc-200 light:text-slate-800 flex-1">{toast.message}</span>
      <button onClick={() => onDismiss(toast.id)} className="text-zinc-600 hover:text-zinc-300 transition-colors">
        <X size={13} />
      </button>
    </div>
  )
}

export function ToastContainer({ toasts, onDismiss }: { toasts: ToastData[]; onDismiss: (id: string) => void }) {
  if (!toasts.length) return null
  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col gap-2 w-80">
      {toasts.map(t => <Toast key={t.id} toast={t} onDismiss={onDismiss} />)}
    </div>
  )
}
