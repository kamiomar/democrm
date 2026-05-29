import { team, rolePermissions, contacts, deals, CURRENT_USER, type UserRole } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { CheckCircle2, XCircle, Shield, Users, TrendingUp } from 'lucide-react'

const roleBadge: Record<UserRole, string> = {
  'Admin':         'bg-violet-500/10 text-violet-400 border border-violet-500/20',
  'Sales Manager': 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
  'Sales Rep':     'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
}

const roleIcon: Record<UserRole, React.ElementType> = {
  'Admin':         Shield,
  'Sales Manager': TrendingUp,
  'Sales Rep':     Users,
}

const PERMISSIONS = [
  'View all contacts', 'Edit any contact', 'Delete contacts',
  'View pipeline',     'Create deals',     'Close deals',
  'View analytics',    'Export data',      'Manage team',
  'Billing & plans',
]

const ROLES: UserRole[] = ['Admin', 'Sales Manager', 'Sales Rep']

export default function TeamPage() {
  return (
    <div className="max-w-5xl space-y-6">

      {/* Header summary */}
      <div className="grid grid-cols-3 sm:grid-cols-3 gap-3 sm:gap-4">
        {[
          { label: 'Team Members', value: team.length, sub: 'across all roles' },
          { label: 'Total Contacts', value: contacts.length, sub: 'assigned to team' },
          { label: 'Open Deals', value: deals.filter(d => d.stage !== 'won' && d.stage !== 'lost').length, sub: 'in pipeline' },
        ].map(({ label, value, sub }) => (
          <div key={label} className="rounded-xl border border-zinc-800 bg-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 light:border-slate-200 light:bg-white p-5">
            <p className="text-xs text-zinc-500 dark:text-zinc-500 light:text-slate-500">{label}</p>
            <p className="text-2xl font-bold text-zinc-100 dark:text-zinc-100 light:text-slate-900 mt-1">{value}</p>
            <p className="text-[10px] text-zinc-600 dark:text-zinc-600 light:text-slate-400 mt-1">{sub}</p>
          </div>
        ))}
      </div>

      {/* Team members */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 light:border-slate-200 light:bg-white overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-800 dark:border-zinc-800 light:border-slate-200">
          <h2 className="text-sm font-semibold text-zinc-100 dark:text-zinc-100 light:text-slate-900">Team Members</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-500 light:text-slate-500 mt-0.5">Manage who has access and what they can do</p>
        </div>
        <div className="divide-y divide-zinc-800/60 dark:divide-zinc-800/60 light:divide-slate-100">
          {team.map(member => {
            const Icon = roleIcon[member.role]
            const ownedContacts = contacts.filter(c => c.owner === member.name).length
            const ownedDeals    = deals.filter(d => d.owner === member.name && d.stage !== 'won' && d.stage !== 'lost').length
            const isCurrentUser = member.id === CURRENT_USER.id
            return (
              <div key={member.id} className="flex items-center gap-4 px-5 py-4 hover:bg-zinc-800/30 dark:hover:bg-zinc-800/30 light:hover:bg-slate-50 transition-colors">
                <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0', member.color)}>
                  {member.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-zinc-100 dark:text-zinc-100 light:text-slate-900">{member.name}</p>
                    {isCurrentUser && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-400 font-medium">You</span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-500 light:text-slate-500">{member.email}</p>
                </div>
                <div className="hidden sm:flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-500 light:text-slate-500">
                  <span><span className="font-semibold text-zinc-300 dark:text-zinc-300 light:text-slate-700">{ownedContacts}</span> contacts</span>
                  <span><span className="font-semibold text-zinc-300 dark:text-zinc-300 light:text-slate-700">{ownedDeals}</span> open deals</span>
                  <span className="text-zinc-600 dark:text-zinc-600 light:text-slate-400">{member.department}</span>
                </div>
                <span className={cn('text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5', roleBadge[member.role])}>
                  <Icon size={11} />
                  {member.role}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Permissions matrix */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 light:border-slate-200 light:bg-white overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-800 dark:border-zinc-800 light:border-slate-200">
          <h2 className="text-sm font-semibold text-zinc-100 dark:text-zinc-100 light:text-slate-900">Role Permissions</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-500 light:text-slate-500 mt-0.5">What each role can do in MarqueCRM</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 dark:border-zinc-800 light:border-slate-200">
                <th className="px-5 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-500 light:text-slate-500 w-1/2">Permission</th>
                {ROLES.map(role => (
                  <th key={role} className="px-4 py-3 text-center">
                    <span className={cn('text-xs font-semibold px-3 py-1 rounded-full inline-flex items-center gap-1.5', roleBadge[role])}>
                      {role}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/40 dark:divide-zinc-800/40 light:divide-slate-100">
              {PERMISSIONS.map(perm => (
                <tr key={perm} className="hover:bg-zinc-800/20 dark:hover:bg-zinc-800/20 light:hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-2.5 text-xs text-zinc-400 dark:text-zinc-400 light:text-slate-600">{perm}</td>
                  {ROLES.map(role => (
                    <td key={role} className="px-4 py-2.5 text-center">
                      {rolePermissions[role][perm]
                        ? <CheckCircle2 size={15} className="text-emerald-400 mx-auto" />
                        : <XCircle     size={15} className="text-zinc-700 dark:text-zinc-700 light:text-slate-300 mx-auto" />
                      }
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
