'use client'

import { useState, useEffect, useCallback } from 'react'
import { CURRENT_USER } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { User, Bell, Shield, CreditCard, Globe, Moon, Sun, Check } from 'lucide-react'
import { useTheme } from 'next-themes'
import { ToastContainer, type ToastData } from '@/components/ui/toast'

type Tab = 'profile' | 'notifications' | 'security' | 'workspace' | 'billing'

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'profile',       label: 'Profile',        icon: User       },
  { id: 'notifications', label: 'Notifications',   icon: Bell       },
  { id: 'security',      label: 'Security',        icon: Shield     },
  { id: 'workspace',     label: 'Workspace',       icon: Globe      },
  { id: 'billing',       label: 'Billing',         icon: CreditCard },
]

const inputCls = cn(
  'w-full px-3 h-9 rounded-lg text-sm outline-none transition-all',
  'bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder-zinc-600',
  'dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-100',
  'light:bg-slate-50 light:border-slate-200 light:text-slate-900',
  'focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10',
)
const label = 'block text-xs font-medium mb-1.5 text-zinc-400 dark:text-zinc-400 light:text-slate-500'
const section = 'rounded-xl border border-zinc-800 bg-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 light:border-slate-200 light:bg-white p-5 sm:p-6'
const sectionTitle = 'text-sm font-semibold text-zinc-100 dark:text-zinc-100 light:text-slate-900 mb-1'
const sectionSub = 'text-xs text-zinc-500 dark:text-zinc-500 light:text-slate-500 mb-5'
const divider = 'border-t border-zinc-800 dark:border-zinc-800 light:border-slate-200 my-5'
const saveBtn = 'px-4 h-9 rounded-lg text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white transition-colors'
const cancelBtn = 'px-4 h-9 rounded-lg text-xs font-medium bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 light:bg-slate-100 light:hover:bg-slate-200 light:text-slate-600 transition-colors'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('profile')
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const [toasts, setToasts] = useState<ToastData[]>([])
  const toast = useCallback((msg: string) => {
    const id = Date.now().toString()
    setToasts(p => [...p, { id, type: 'success', message: msg }])
  }, [])
  const dismiss = useCallback((id: string) => setToasts(p => p.filter(t => t.id !== id)), [])

  // Profile form state
  const [profile, setProfile] = useState({ name: CURRENT_USER.name, email: CURRENT_USER.email, title: 'Senior Engineer', phone: '+1 (415) 820-3344', bio: 'Building great products at MarqueFactory.' })

  // Notification toggles
  const [notifs, setNotifs] = useState({ emailDeals: true, emailContacts: false, emailWeekly: true, pushDeals: true, pushMentions: true, pushTasks: false })

  // Security
  const [twoFa, setTwoFa] = useState(false)

  return (
    <div className="max-w-4xl">
      <div className="flex flex-col sm:flex-row gap-6">

        {/* ── Sidebar tabs ── */}
        <nav className="sm:w-44 flex sm:flex-col gap-1 overflow-x-auto sm:overflow-visible pb-1 sm:pb-0 scrollbar-none flex-shrink-0">
          {tabs.map(({ id, label: lbl, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={cn(
                'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors text-left',
                activeTab === id
                  ? 'bg-violet-600/15 text-violet-400 dark:bg-violet-600/15 dark:text-violet-400 light:bg-violet-50 light:text-violet-700'
                  : 'text-zinc-400 dark:text-zinc-400 light:text-slate-600 hover:bg-zinc-800 dark:hover:bg-zinc-800 light:hover:bg-slate-100 hover:text-zinc-200 dark:hover:text-zinc-200 light:hover:text-slate-900',
              )}>
              <Icon size={14} />
              {lbl}
            </button>
          ))}
        </nav>

        {/* ── Content ── */}
        <div className="flex-1 space-y-4 min-w-0">

          {/* PROFILE */}
          {activeTab === 'profile' && (
            <>
              <div className={section}>
                <p className={sectionTitle}>Personal Information</p>
                <p className={sectionSub}>Update your name, email and contact details</p>
                <div className="flex items-center gap-4 mb-6">
                  <div className={cn('w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white', CURRENT_USER.color)}>
                    {CURRENT_USER.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-zinc-200 dark:text-zinc-200 light:text-slate-800">{profile.name}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-500 light:text-slate-500">{CURRENT_USER.role} · {CURRENT_USER.department}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className={label}>Full Name</label><input className={inputCls} value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} /></div>
                  <div><label className={label}>Email</label><input type="email" className={inputCls} value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} /></div>
                  <div><label className={label}>Job Title</label><input className={inputCls} value={profile.title} onChange={e => setProfile(p => ({ ...p, title: e.target.value }))} /></div>
                  <div><label className={label}>Phone</label><input className={inputCls} value={profile.phone} onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))} /></div>
                </div>
                <div className="mt-4"><label className={label}>Bio</label><textarea rows={3} className={cn(inputCls, 'h-auto py-2 resize-none')} value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))} /></div>
                <div className="flex gap-2 mt-5"><button className={saveBtn} onClick={() => toast('Profile saved')}>Save Changes</button><button className={cancelBtn}>Cancel</button></div>
              </div>

              <div className={section}>
                <p className={sectionTitle}>Appearance</p>
                <p className={sectionSub}>Choose your preferred colour scheme</p>
                <div className="flex gap-3">
                  {(['dark', 'light'] as const).map(t => (
                    <button key={t} onClick={() => setTheme(t)}
                      className={cn(
                        'flex items-center gap-2 px-4 h-9 rounded-lg text-sm font-medium border transition-colors',
                        theme === t
                          ? 'border-violet-500 bg-violet-600/10 text-violet-400'
                          : 'border-zinc-700 dark:border-zinc-700 light:border-slate-200 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-200 light:text-slate-600 light:hover:border-slate-300',
                      )}>
                      {t === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
                      {t === 'dark' ? 'Dark' : 'Light'}
                      {mounted && theme === t && <Check size={12} className="text-violet-400" />}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className={section}>
              <p className={sectionTitle}>Notification Preferences</p>
              <p className={sectionSub}>Control when and how you get notified</p>

              {[
                { group: 'Email', items: [
                  { key: 'emailDeals',    label: 'Deal stage changes',      desc: 'When a deal moves to a new stage' },
                  { key: 'emailContacts', label: 'New contact assigned',    desc: 'When a contact is assigned to you' },
                  { key: 'emailWeekly',   label: 'Weekly digest',           desc: 'Summary of your pipeline every Monday' },
                ]},
                { group: 'Push', items: [
                  { key: 'pushDeals',    label: 'Deal won / lost',          desc: 'Instant notification on deal outcome' },
                  { key: 'pushMentions', label: 'Mentions & comments',      desc: 'When someone @mentions you in a note' },
                  { key: 'pushTasks',    label: 'Task reminders',           desc: '30 minutes before a scheduled task' },
                ]},
              ].map(({ group, items }) => (
                <div key={group}>
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 dark:text-zinc-600 light:text-slate-400 mb-3">{group}</p>
                  <div className="space-y-3 mb-5">
                    {items.map(({ key, label: lbl, desc }) => (
                      <div key={key} className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm text-zinc-200 dark:text-zinc-200 light:text-slate-800">{lbl}</p>
                          <p className="text-xs text-zinc-500 dark:text-zinc-500 light:text-slate-500">{desc}</p>
                        </div>
                        <button
                          onClick={() => setNotifs(n => ({ ...n, [key]: !n[key as keyof typeof n] }))}
                          className={cn('relative flex-shrink-0 w-10 h-5 rounded-full transition-colors', notifs[key as keyof typeof notifs] ? 'bg-violet-600' : 'bg-zinc-700 dark:bg-zinc-700 light:bg-slate-200')}
                        >
                          <span className={cn('absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform', notifs[key as keyof typeof notifs] && 'translate-x-5')} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <button className={saveBtn} onClick={() => toast('Notification preferences saved')}>Save Preferences</button>
            </div>
          )}

          {/* SECURITY */}
          {activeTab === 'security' && (
            <div className={section}>
              <p className={sectionTitle}>Password</p>
              <p className={sectionSub}>Update your login credentials</p>
              <div className="space-y-3 max-w-sm">
                <div><label className={label}>Current Password</label><input type="password" className={inputCls} placeholder="••••••••" /></div>
                <div><label className={label}>New Password</label><input type="password" className={inputCls} placeholder="••••••••" /></div>
                <div><label className={label}>Confirm New Password</label><input type="password" className={inputCls} placeholder="••••••••" /></div>
              </div>
              <button className={cn(saveBtn, 'mt-4')} onClick={() => toast('Password updated')}>Update Password</button>

              <div className={divider} />

              <p className={sectionTitle}>Two-Factor Authentication</p>
              <p className={sectionSub}>Add an extra layer of security to your account</p>
              <div className="flex items-center justify-between p-4 rounded-lg border border-zinc-800 dark:border-zinc-800 light:border-slate-200">
                <div>
                  <p className="text-sm font-medium text-zinc-200 dark:text-zinc-200 light:text-slate-800">Authenticator App</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-500 light:text-slate-500 mt-0.5">{twoFa ? 'Enabled — your account is protected' : 'Not configured'}</p>
                </div>
                <button onClick={() => { setTwoFa(t => !t); toast(twoFa ? '2FA disabled' : '2FA enabled') }}
                  className={cn('px-3 h-8 rounded-lg text-xs font-medium transition-colors', twoFa ? 'bg-rose-600/10 text-rose-400 hover:bg-rose-600/20 border border-rose-600/30' : 'bg-violet-600 hover:bg-violet-500 text-white')}>
                  {twoFa ? 'Disable' : 'Enable'}
                </button>
              </div>

              <div className={divider} />

              <p className={sectionTitle}>Active Sessions</p>
              <p className={sectionSub}>Devices currently signed in to your account</p>
              {[
                { device: 'MacBook Pro 16"',   location: 'San Francisco, CA', current: true,  last: 'Now' },
                { device: 'iPhone 15 Pro',      location: 'San Francisco, CA', current: false, last: '2 hours ago' },
                { device: 'Chrome on Windows', location: 'Seattle, WA',       current: false, last: '3 days ago' },
              ].map(s => (
                <div key={s.device} className="flex items-center justify-between py-3 border-b border-zinc-800/50 dark:border-zinc-800/50 light:border-slate-100 last:border-0">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-zinc-200 dark:text-zinc-200 light:text-slate-800">{s.device}</p>
                      {s.current && <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-medium">Current</span>}
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-500 light:text-slate-500">{s.location} · {s.last}</p>
                  </div>
                  {!s.current && (
                    <button className="text-xs text-rose-400 hover:underline" onClick={() => toast('Session revoked')}>Revoke</button>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* WORKSPACE */}
          {activeTab === 'workspace' && (
            <div className={section}>
              <p className={sectionTitle}>Workspace Settings</p>
              <p className={sectionSub}>Configure your organisation's CRM settings</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label className={label}>Workspace Name</label><input className={inputCls} defaultValue="Acme Corp Workspace" /></div>
                <div><label className={label}>Default Currency</label>
                  <select className={inputCls}><option>USD — US Dollar</option><option>EUR — Euro</option><option>GBP — British Pound</option><option>CAD — Canadian Dollar</option></select>
                </div>
                <div><label className={label}>Fiscal Year Start</label>
                  <select className={inputCls}><option>January</option><option>April</option><option>July</option><option>October</option></select>
                </div>
                <div><label className={label}>Default Deal Stage</label>
                  <select className={inputCls}><option>New Lead</option><option>Qualified</option><option>Proposal Sent</option></select>
                </div>
              </div>
              <div className={divider} />
              <p className="text-xs font-semibold uppercase tracking-widest text-zinc-600 dark:text-zinc-600 light:text-slate-400 mb-3">Integrations</p>
              {[
                { name: 'Slack',      desc: 'Send deal notifications to Slack', connected: true  },
                { name: 'HubSpot',    desc: 'Sync contacts bidirectionally',    connected: false },
                { name: 'Salesforce', desc: 'Import existing pipeline data',    connected: false },
                { name: 'Zapier',     desc: 'Automate with 5000+ apps',         connected: true  },
              ].map(intg => (
                <div key={intg.name} className="flex items-center justify-between py-3 border-b border-zinc-800/50 dark:border-zinc-800/50 light:border-slate-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-zinc-200 dark:text-zinc-200 light:text-slate-800">{intg.name}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-500 light:text-slate-500">{intg.desc}</p>
                  </div>
                  <span className={cn('text-xs font-medium px-2.5 py-1 rounded-full', intg.connected ? 'bg-emerald-500/10 text-emerald-400' : 'bg-zinc-800 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500 light:bg-slate-100 light:text-slate-500')}>
                    {intg.connected ? 'Connected' : 'Connect'}
                  </span>
                </div>
              ))}
              <button className={cn(saveBtn, 'mt-4')} onClick={() => toast('Workspace settings saved')}>Save Changes</button>
            </div>
          )}

          {/* BILLING */}
          {activeTab === 'billing' && (
            <>
              <div className={section}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className={sectionTitle}>Current Plan</p>
                    <p className={sectionSub}>You are on the Pro plan</p>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">Pro</span>
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-br from-violet-600/10 to-indigo-600/10 border border-violet-500/20">
                  <div className="flex items-end gap-1.5">
                    <span className="text-3xl font-bold text-zinc-100 dark:text-zinc-100 light:text-slate-900">$79</span>
                    <span className="text-sm text-zinc-400 dark:text-zinc-400 light:text-slate-500 mb-1">/month · billed annually</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {['Unlimited contacts', '5 team members', 'Advanced analytics', 'API access', 'Priority support', 'Custom integrations'].map(f => (
                      <div key={f} className="flex items-center gap-1.5 text-xs text-zinc-300 dark:text-zinc-300 light:text-slate-700">
                        <Check size={11} className="text-violet-400 flex-shrink-0" />{f}
                      </div>
                    ))}
                  </div>
                </div>
                <button className="mt-4 px-4 h-9 rounded-lg text-xs font-medium border border-zinc-700 dark:border-zinc-700 light:border-slate-200 text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 dark:hover:border-zinc-600 light:hover:border-slate-400 transition-colors">
                  Upgrade to Enterprise
                </button>
              </div>

              <div className={section}>
                <p className={sectionTitle}>Payment Method</p>
                <p className={sectionSub}>Manage your billing information</p>
                <div className="flex items-center gap-3 p-3 rounded-lg border border-zinc-800 dark:border-zinc-800 light:border-slate-200">
                  <div className="w-10 h-7 rounded bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white text-[10px] font-bold">VISA</div>
                  <div className="flex-1">
                    <p className="text-sm text-zinc-200 dark:text-zinc-200 light:text-slate-800">•••• •••• •••• 4242</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-500 light:text-slate-500">Expires 12/2027</p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-medium">Default</span>
                </div>
                <button className="mt-3 text-xs text-violet-400 hover:underline">+ Add payment method</button>
              </div>

              <div className={section}>
                <p className={sectionTitle}>Billing History</p>
                <p className={sectionSub}>Your last 4 invoices</p>
                <div className="space-y-2">
                  {[
                    { date: 'May 1, 2026',  amount: '$79.00', status: 'Paid' },
                    { date: 'Apr 1, 2026',  amount: '$79.00', status: 'Paid' },
                    { date: 'Mar 1, 2026',  amount: '$79.00', status: 'Paid' },
                    { date: 'Feb 1, 2026',  amount: '$79.00', status: 'Paid' },
                  ].map(inv => (
                    <div key={inv.date} className="flex items-center justify-between py-2.5 border-b border-zinc-800/50 dark:border-zinc-800/50 light:border-slate-100 last:border-0 text-xs">
                      <span className="text-zinc-400 dark:text-zinc-400 light:text-slate-600">{inv.date}</span>
                      <span className="font-medium text-zinc-200 dark:text-zinc-200 light:text-slate-800">{inv.amount}</span>
                      <span className="text-emerald-400">{inv.status}</span>
                      <button className="text-violet-400 hover:underline">Download</button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </div>
  )
}
