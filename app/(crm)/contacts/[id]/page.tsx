import { notFound } from 'next/navigation'
import Link from 'next/link'
import { contacts, deals, getAvatarColor, type ContactStatus } from '@/lib/mock-data'
import { formatCurrency, formatDate, initials, cn } from '@/lib/utils'
import { ActivityTimeline } from '@/components/contact/activity-timeline'
import { ArrowLeft, Mail, Phone, Globe, MapPin, User, Building, ExternalLink } from 'lucide-react'

const statusBadge: Record<ContactStatus, string> = {
  Lead: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
  Prospect: 'bg-violet-500/10 text-violet-400 border border-violet-500/20',
  Customer: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  Churned: 'bg-zinc-500/10 text-zinc-400 border border-zinc-500/20',
}

const stageColors = {
  new: 'bg-indigo-500',
  qualified: 'bg-violet-500',
  proposal: 'bg-amber-500',
  negotiation: 'bg-orange-500',
  won: 'bg-emerald-500',
  lost: 'bg-rose-500',
}

export default async function ContactDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const contact = contacts.find(c => c.id === id)
  if (!contact) notFound()

  const contactDeals = deals.filter(d => d.contactId === id)

  return (
    <div className="max-w-6xl">
      {/* Back */}
      <Link href="/contacts" className="inline-flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-500 light:text-slate-500 hover:text-zinc-300 dark:hover:text-zinc-300 light:hover:text-slate-800 transition-colors mb-5">
        <ArrowLeft size={13} /> Back to Contacts
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left column */}
        <div className="space-y-4">
          {/* Hero card */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 light:border-slate-200 light:bg-white p-5">
            <div className="flex flex-col items-center text-center gap-3">
              <div className={cn('w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white shadow-lg', getAvatarColor(contact.id))}>
                {initials(contact.name)}
              </div>
              <div>
                <h2 className="text-base font-semibold text-zinc-100 dark:text-zinc-100 light:text-slate-900">{contact.name}</h2>
                <p className="text-xs text-zinc-400 dark:text-zinc-400 light:text-slate-600 mt-0.5">{contact.title}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-500 light:text-slate-500">{contact.company}</p>
              </div>
              <span className={cn('text-xs font-medium px-3 py-1 rounded-full', statusBadge[contact.status])}>
                {contact.status}
              </span>
            </div>

            <div className="mt-5 flex gap-2">
              <a href={`mailto:${contact.email}`} className="flex-1 flex items-center justify-center gap-1.5 h-8 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-xs font-medium transition-colors">
                <Mail size={13} /> Email
              </a>
              <a href={`tel:${contact.phone}`} className="flex-1 flex items-center justify-center gap-1.5 h-8 rounded-lg bg-zinc-800 dark:bg-zinc-800 light:bg-slate-100 text-zinc-300 dark:text-zinc-300 light:text-slate-700 text-xs font-medium hover:bg-zinc-700 dark:hover:bg-zinc-700 light:hover:bg-slate-200 transition-colors">
                <Phone size={13} /> Call
              </a>
            </div>
          </div>

          {/* Contact info */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 light:border-slate-200 light:bg-white p-5 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-600 dark:text-zinc-600 light:text-slate-400 mb-3">Contact Info</h3>
            {[
              { icon: Mail, label: 'Email', value: contact.email },
              { icon: Phone, label: 'Phone', value: contact.phone },
              { icon: Globe, label: 'Website', value: contact.website },
              { icon: MapPin, label: 'Location', value: contact.location },
              { icon: User, label: 'Owner', value: contact.owner },
              { icon: Building, label: 'Company', value: contact.company },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <Icon size={13} className="mt-0.5 text-zinc-500 dark:text-zinc-500 light:text-slate-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-zinc-600 dark:text-zinc-600 light:text-slate-400">{label}</p>
                  <p className="text-xs text-zinc-300 dark:text-zinc-300 light:text-slate-700 truncate">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 light:border-slate-200 light:bg-white p-5">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-600 dark:text-zinc-600 light:text-slate-400 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-1.5">
              {contact.tags.map(tag => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-zinc-800 dark:bg-zinc-800 light:bg-slate-100 text-zinc-400 dark:text-zinc-400 light:text-slate-600 border border-zinc-700 dark:border-zinc-700 light:border-slate-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Value & deals */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 light:border-slate-200 light:bg-white p-5">
              <p className="text-xs text-zinc-500 dark:text-zinc-500 light:text-slate-500">Total Value</p>
              <p className="text-2xl font-bold text-zinc-100 dark:text-zinc-100 light:text-slate-900 mt-1">{formatCurrency(contact.value)}</p>
              <p className="text-[10px] text-zinc-600 dark:text-zinc-600 light:text-slate-400 mt-1">Added {formatDate(contact.createdAt)}</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 light:border-slate-200 light:bg-white p-5">
              <p className="text-xs text-zinc-500 dark:text-zinc-500 light:text-slate-500">Active Deals</p>
              <p className="text-2xl font-bold text-zinc-100 dark:text-zinc-100 light:text-slate-900 mt-1">{contactDeals.filter(d => d.stage !== 'lost').length}</p>
              <p className="text-[10px] text-zinc-600 dark:text-zinc-600 light:text-slate-400 mt-1">
                {contactDeals.filter(d => d.stage === 'won').length} won
              </p>
            </div>
          </div>

          {/* Deals */}
          {contactDeals.length > 0 && (
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 light:border-slate-200 light:bg-white p-5">
              <h3 className="text-sm font-semibold text-zinc-100 dark:text-zinc-100 light:text-slate-900 mb-4">Deals</h3>
              <div className="space-y-3">
                {contactDeals.map(deal => (
                  <div key={deal.id} className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/40 dark:bg-zinc-800/40 light:bg-slate-50 border border-zinc-800 dark:border-zinc-800 light:border-slate-200">
                    <div className={cn('w-2 h-2 rounded-full flex-shrink-0', stageColors[deal.stage])} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-zinc-200 dark:text-zinc-200 light:text-slate-800">{deal.company}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-[10px] text-zinc-500 dark:text-zinc-500 light:text-slate-500">Close: {formatDate(deal.closeDate)}</p>
                        <span className="text-zinc-700 dark:text-zinc-700 light:text-slate-300">·</span>
                        <p className="text-[10px] text-zinc-500 dark:text-zinc-500 light:text-slate-500">{deal.probability}% probability</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-zinc-200 dark:text-zinc-200 light:text-slate-800 tabular-nums">
                      {formatCurrency(deal.value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activity timeline */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 light:border-slate-200 light:bg-white p-5">
            <ActivityTimeline contactId={contact.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
