export type ContactStatus = 'Lead' | 'Prospect' | 'Customer' | 'Churned'
export type DealStage = 'new' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost'
export type ActivityType = 'email' | 'call' | 'note' | 'meeting' | 'deal_update' | 'stage_change'
export type Priority = 'Low' | 'Medium' | 'High'
export type UserRole = 'Admin' | 'Sales Manager' | 'Sales Rep'

export interface TeamMember {
  id: string
  name: string
  email: string
  role: UserRole
  initials: string
  color: string
  department: string
  joinedAt: string
}

export const team: TeamMember[] = [
  { id: 'u1', name: 'Alex Chen',   email: 'alex@marquefactory.com',   role: 'Admin',         initials: 'AC', color: 'bg-violet-500',  department: 'Engineering',  joinedAt: '2024-01-10' },
  { id: 'u2', name: 'Jordan Lee',  email: 'jordan@marquefactory.com', role: 'Sales Manager', initials: 'JL', color: 'bg-indigo-500',  department: 'Sales',        joinedAt: '2024-03-05' },
  { id: 'u3', name: 'Sam Park',    email: 'sam@marquefactory.com',    role: 'Sales Rep',     initials: 'SP', color: 'bg-emerald-500', department: 'Sales',        joinedAt: '2024-06-20' },
]

export const CURRENT_USER = team[0]   // Alex Chen (Admin)

export const rolePermissions: Record<UserRole, Record<string, boolean>> = {
  'Admin': {
    'View all contacts': true,  'Edit any contact': true,   'Delete contacts': true,
    'View pipeline':     true,  'Create deals':     true,   'Close deals':     true,
    'View analytics':    true,  'Export data':      true,   'Manage team':     true,
    'Billing & plans':   true,
  },
  'Sales Manager': {
    'View all contacts': true,  'Edit any contact': true,   'Delete contacts': false,
    'View pipeline':     true,  'Create deals':     true,   'Close deals':     true,
    'View analytics':    true,  'Export data':      true,   'Manage team':     false,
    'Billing & plans':   false,
  },
  'Sales Rep': {
    'View all contacts': false, 'Edit any contact': false,  'Delete contacts': false,
    'View pipeline':     true,  'Create deals':     true,   'Close deals':     false,
    'View analytics':    false, 'Export data':      false,  'Manage team':     false,
    'Billing & plans':   false,
  },
}

export interface Contact {
  id: string
  name: string
  email: string
  phone: string
  company: string
  title: string
  status: ContactStatus
  avatar: string
  location: string
  website: string
  value: number
  lastContact: string
  owner: string
  tags: string[]
  createdAt: string
}

export interface Deal {
  id: string
  contactId: string
  contactName: string
  company: string
  stage: DealStage
  value: number
  probability: number
  priority: Priority
  closeDate: string
  owner: string
  createdAt: string
}

export interface Activity {
  id: string
  contactId: string
  type: ActivityType
  title: string
  body: string
  timestamp: string
  user: string
}

export interface RevenuePoint {
  month: string
  revenue: number
  target: number
}

const avatarColors = [
  'bg-violet-500', 'bg-indigo-500', 'bg-blue-500', 'bg-emerald-500',
  'bg-amber-500', 'bg-rose-500', 'bg-cyan-500', 'bg-pink-500',
]

export function getAvatarColor(id: string) {
  const index = id.charCodeAt(id.length - 1) % avatarColors.length
  return avatarColors[index]
}

export const contacts: Contact[] = [
  { id: 'c1', name: 'Sophia Harrington', email: 'sophia@nexus-tech.io', phone: '+1 (415) 820-3344', company: 'Nexus Technologies', title: 'VP of Engineering', status: 'Customer', avatar: '', location: 'San Francisco, CA', website: 'nexus-tech.io', value: 48000, lastContact: '2026-05-25', owner: 'Alex Chen', tags: ['Enterprise', 'SaaS'], createdAt: '2025-09-10' },
  { id: 'c2', name: 'Marcus Webb', email: 'marcus@bridgepoint.co', phone: '+1 (312) 774-9910', company: 'Bridgepoint Capital', title: 'Chief Technology Officer', status: 'Prospect', avatar: '', location: 'Chicago, IL', website: 'bridgepoint.co', value: 72000, lastContact: '2026-05-22', owner: 'Jordan Lee', tags: ['Finance', 'High Value'], createdAt: '2025-11-02' },
  { id: 'c3', name: 'Elena Vasquez', email: 'elena@cloudwave.ai', phone: '+1 (650) 334-6680', company: 'CloudWave AI', title: 'Head of Product', status: 'Customer', avatar: '', location: 'Palo Alto, CA', website: 'cloudwave.ai', value: 35000, lastContact: '2026-05-27', owner: 'Alex Chen', tags: ['AI/ML', 'Startup'], createdAt: '2025-08-15' },
  { id: 'c4', name: 'James Thornton', email: 'james@scalehub.com', phone: '+1 (646) 882-4421', company: 'ScaleHub Inc.', title: 'Founder & CEO', status: 'Lead', avatar: '', location: 'New York, NY', website: 'scalehub.com', value: 18000, lastContact: '2026-05-18', owner: 'Sam Park', tags: ['Startup', 'Growth'], createdAt: '2026-03-20' },
  { id: 'c5', name: 'Amara Okonkwo', email: 'amara@meridian-ops.com', phone: '+1 (404) 556-7723', company: 'Meridian Ops', title: 'Director of Sales', status: 'Prospect', avatar: '', location: 'Atlanta, GA', website: 'meridian-ops.com', value: 28000, lastContact: '2026-05-20', owner: 'Jordan Lee', tags: ['Operations', 'SMB'], createdAt: '2026-01-08' },
  { id: 'c6', name: 'Daniel Park', email: 'daniel@quantumleap.dev', phone: '+1 (206) 910-4456', company: 'QuantumLeap Dev', title: 'Platform Engineer', status: 'Customer', avatar: '', location: 'Seattle, WA', website: 'quantumleap.dev', value: 22000, lastContact: '2026-05-24', owner: 'Alex Chen', tags: ['DevOps', 'Cloud'], createdAt: '2025-10-14' },
  { id: 'c7', name: 'Priya Nair', email: 'priya@inflection.io', phone: '+1 (628) 341-7880', company: 'Inflection Analytics', title: 'Data Science Lead', status: 'Prospect', avatar: '', location: 'San Francisco, CA', website: 'inflection.io', value: 55000, lastContact: '2026-05-15', owner: 'Sam Park', tags: ['Analytics', 'Enterprise'], createdAt: '2026-02-11' },
  { id: 'c8', name: 'Liam Fitzgerald', email: 'liam@crestview-re.com', phone: '+1 (617) 448-2230', company: 'Crestview Real Estate', title: 'IT Manager', status: 'Lead', avatar: '', location: 'Boston, MA', website: 'crestview-re.com', value: 14000, lastContact: '2026-05-10', owner: 'Jordan Lee', tags: ['Real Estate', 'SMB'], createdAt: '2026-04-02' },
  { id: 'c9', name: 'Isabella Chen', email: 'isabella@novaform.co', phone: '+1 (512) 773-9012', company: 'Novaform Studios', title: 'Creative Director', status: 'Churned', avatar: '', location: 'Austin, TX', website: 'novaform.co', value: 9500, lastContact: '2026-01-30', owner: 'Alex Chen', tags: ['Design', 'Agency'], createdAt: '2025-06-20' },
  { id: 'c10', name: 'Omar Abdullah', email: 'omar@pinnacle-fi.com', phone: '+1 (305) 622-8890', company: 'Pinnacle Finance', title: 'VP Operations', status: 'Customer', avatar: '', location: 'Miami, FL', website: 'pinnacle-fi.com', value: 61000, lastContact: '2026-05-26', owner: 'Sam Park', tags: ['Finance', 'Enterprise'], createdAt: '2025-07-05' },
  { id: 'c11', name: 'Natalie Rousseau', email: 'natalie@luminary-hq.com', phone: '+1 (514) 881-3340', company: 'Luminary HQ', title: 'COO', status: 'Prospect', avatar: '', location: 'Montreal, QC', website: 'luminary-hq.com', value: 38000, lastContact: '2026-05-21', owner: 'Jordan Lee', tags: ['SaaS', 'Scale-up'], createdAt: '2026-01-25' },
  { id: 'c12', name: 'Ethan Brooks', email: 'ethan@ironclad-sec.com', phone: '+1 (703) 445-6678', company: 'Ironclad Security', title: 'CISO', status: 'Customer', avatar: '', location: 'Washington, DC', website: 'ironclad-sec.com', value: 84000, lastContact: '2026-05-23', owner: 'Alex Chen', tags: ['Security', 'Enterprise', 'High Value'], createdAt: '2025-05-18' },
  { id: 'c13', name: 'Sofia Martinez', email: 'sofia@launch-pad.mx', phone: '+52 55 4420 9900', company: 'Launchpad LATAM', title: 'Business Dev Manager', status: 'Lead', avatar: '', location: 'Mexico City, MX', website: 'launch-pad.mx', value: 21000, lastContact: '2026-05-12', owner: 'Sam Park', tags: ['LATAM', 'Growth'], createdAt: '2026-03-14' },
  { id: 'c14', name: 'Kevin O\'Brien', email: 'kevin@stackflow.io', phone: '+1 (720) 330-7721', company: 'StackFlow Technologies', title: 'CTO', status: 'Prospect', avatar: '', location: 'Denver, CO', website: 'stackflow.io', value: 43000, lastContact: '2026-05-19', owner: 'Jordan Lee', tags: ['DevTools', 'SaaS'], createdAt: '2026-02-28' },
  { id: 'c15', name: 'Yuki Tanaka', email: 'yuki@orion-sys.jp', phone: '+81 3 5678 9012', company: 'Orion Systems', title: 'Product Manager', status: 'Customer', avatar: '', location: 'Tokyo, JP', website: 'orion-sys.jp', value: 29000, lastContact: '2026-05-25', owner: 'Alex Chen', tags: ['APAC', 'Enterprise'], createdAt: '2025-12-01' },
  { id: 'c16', name: 'Hannah Cole', email: 'hannah@greenlight-media.co', phone: '+44 20 7946 0011', company: 'Greenlight Media', title: 'Marketing Director', status: 'Lead', avatar: '', location: 'London, UK', website: 'greenlight-media.co', value: 17500, lastContact: '2026-05-14', owner: 'Sam Park', tags: ['Media', 'Europe'], createdAt: '2026-04-10' },
  { id: 'c17', name: 'Rafael Dias', email: 'rafael@vortex-ai.br', phone: '+55 11 9876 5432', company: 'Vortex AI', title: 'Lead Engineer', status: 'Prospect', avatar: '', location: 'São Paulo, BR', website: 'vortex-ai.br', value: 33000, lastContact: '2026-05-16', owner: 'Jordan Lee', tags: ['AI', 'LATAM', 'Startup'], createdAt: '2026-01-19' },
  { id: 'c18', name: 'Claire Dupont', email: 'claire@synapse-bio.eu', phone: '+33 1 4201 8800', company: 'Synapse BioTech', title: 'CFO', status: 'Customer', avatar: '', location: 'Paris, FR', website: 'synapse-bio.eu', value: 96000, lastContact: '2026-05-27', owner: 'Alex Chen', tags: ['BioTech', 'Enterprise', 'High Value'], createdAt: '2025-04-22' },
  { id: 'c19', name: 'Tyler Johnson', email: 'tyler@apex-cloud.us', phone: '+1 (469) 554-3300', company: 'Apex Cloud', title: 'Solutions Architect', status: 'Churned', avatar: '', location: 'Dallas, TX', website: 'apex-cloud.us', value: 11000, lastContact: '2025-12-18', owner: 'Sam Park', tags: ['Cloud', 'SMB'], createdAt: '2025-03-08' },
  { id: 'c20', name: 'Aisha Kamara', email: 'aisha@foresight-vc.co', phone: '+1 (415) 229-7744', company: 'Foresight Ventures', title: 'Investment Director', status: 'Prospect', avatar: '', location: 'San Francisco, CA', website: 'foresight-vc.co', value: 120000, lastContact: '2026-05-23', owner: 'Jordan Lee', tags: ['VC', 'High Value', 'Enterprise'], createdAt: '2026-03-01' },
]

export const deals: Deal[] = [
  { id: 'd1', contactId: 'c20', contactName: 'Aisha Kamara', company: 'Foresight Ventures', stage: 'negotiation', value: 120000, probability: 70, priority: 'High', closeDate: '2026-06-30', owner: 'Jordan Lee', createdAt: '2026-03-01' },
  { id: 'd2', contactId: 'c18', contactName: 'Claire Dupont', company: 'Synapse BioTech', stage: 'won', value: 96000, probability: 100, priority: 'High', closeDate: '2026-05-01', owner: 'Alex Chen', createdAt: '2026-01-15' },
  { id: 'd3', contactId: 'c12', contactName: 'Ethan Brooks', company: 'Ironclad Security', stage: 'won', value: 84000, probability: 100, priority: 'High', closeDate: '2026-04-15', owner: 'Alex Chen', createdAt: '2026-02-01' },
  { id: 'd4', contactId: 'c2', contactName: 'Marcus Webb', company: 'Bridgepoint Capital', stage: 'proposal', value: 72000, probability: 45, priority: 'High', closeDate: '2026-07-15', owner: 'Jordan Lee', createdAt: '2026-02-20' },
  { id: 'd5', contactId: 'c10', contactName: 'Omar Abdullah', company: 'Pinnacle Finance', stage: 'won', value: 61000, probability: 100, priority: 'High', closeDate: '2026-03-22', owner: 'Sam Park', createdAt: '2025-12-10' },
  { id: 'd6', contactId: 'c7', contactName: 'Priya Nair', company: 'Inflection Analytics', stage: 'qualified', value: 55000, probability: 30, priority: 'High', closeDate: '2026-08-01', owner: 'Sam Park', createdAt: '2026-04-01' },
  { id: 'd7', contactId: 'c1', contactName: 'Sophia Harrington', company: 'Nexus Technologies', stage: 'won', value: 48000, probability: 100, priority: 'Medium', closeDate: '2026-02-28', owner: 'Alex Chen', createdAt: '2025-11-05' },
  { id: 'd8', contactId: 'c14', contactName: 'Kevin O\'Brien', company: 'StackFlow Technologies', stage: 'negotiation', value: 43000, probability: 65, priority: 'Medium', closeDate: '2026-06-20', owner: 'Jordan Lee', createdAt: '2026-03-10' },
  { id: 'd9', contactId: 'c11', contactName: 'Natalie Rousseau', company: 'Luminary HQ', stage: 'proposal', value: 38000, probability: 40, priority: 'Medium', closeDate: '2026-07-01', owner: 'Jordan Lee', createdAt: '2026-03-25' },
  { id: 'd10', contactId: 'c3', contactName: 'Elena Vasquez', company: 'CloudWave AI', stage: 'won', value: 35000, probability: 100, priority: 'Medium', closeDate: '2026-04-10', owner: 'Alex Chen', createdAt: '2025-12-20' },
  { id: 'd11', contactId: 'c17', contactName: 'Rafael Dias', company: 'Vortex AI', stage: 'qualified', value: 33000, probability: 25, priority: 'Medium', closeDate: '2026-08-15', owner: 'Jordan Lee', createdAt: '2026-04-10' },
  { id: 'd12', contactId: 'c15', contactName: 'Yuki Tanaka', company: 'Orion Systems', stage: 'won', value: 29000, probability: 100, priority: 'Low', closeDate: '2026-03-01', owner: 'Alex Chen', createdAt: '2025-11-15' },
  { id: 'd13', contactId: 'c5', contactName: 'Amara Okonkwo', company: 'Meridian Ops', stage: 'proposal', value: 28000, probability: 35, priority: 'Medium', closeDate: '2026-07-20', owner: 'Jordan Lee', createdAt: '2026-04-05' },
  { id: 'd14', contactId: 'c6', contactName: 'Daniel Park', company: 'QuantumLeap Dev', stage: 'won', value: 22000, probability: 100, priority: 'Low', closeDate: '2026-01-31', owner: 'Alex Chen', createdAt: '2025-09-20' },
  { id: 'd15', contactId: 'c13', contactName: 'Sofia Martinez', company: 'Launchpad LATAM', stage: 'new', value: 21000, probability: 15, priority: 'Low', closeDate: '2026-09-01', owner: 'Sam Park', createdAt: '2026-05-01' },
  { id: 'd16', contactId: 'c4', contactName: 'James Thornton', company: 'ScaleHub Inc.', stage: 'new', value: 18000, probability: 10, priority: 'Low', closeDate: '2026-09-15', owner: 'Sam Park', createdAt: '2026-05-05' },
  { id: 'd17', contactId: 'c16', contactName: 'Hannah Cole', company: 'Greenlight Media', stage: 'new', value: 17500, probability: 10, priority: 'Low', closeDate: '2026-09-30', owner: 'Sam Park', createdAt: '2026-05-10' },
  { id: 'd18', contactId: 'c8', contactName: 'Liam Fitzgerald', company: 'Crestview Real Estate', stage: 'qualified', value: 14000, probability: 20, priority: 'Low', closeDate: '2026-08-30', owner: 'Jordan Lee', createdAt: '2026-04-20' },
  { id: 'd19', contactId: 'c9', contactName: 'Isabella Chen', company: 'Novaform Studios', stage: 'lost', value: 9500, probability: 0, priority: 'Low', closeDate: '2026-01-15', owner: 'Alex Chen', createdAt: '2025-10-01' },
  { id: 'd20', contactId: 'c19', contactName: 'Tyler Johnson', company: 'Apex Cloud', stage: 'lost', value: 11000, probability: 0, priority: 'Low', closeDate: '2025-12-31', owner: 'Sam Park', createdAt: '2025-09-01' },
]

export const activities: Activity[] = [
  { id: 'a1', contactId: 'c1', type: 'email', title: 'Sent onboarding follow-up', body: 'Hi Sophia, just checking in on your onboarding progress. Our team is available for a 30-min walkthrough this week.', timestamp: '2026-05-25T14:32:00Z', user: 'Alex Chen' },
  { id: 'a2', contactId: 'c2', type: 'meeting', title: 'Discovery call', body: 'Had a 45-min discovery call. Marcus is evaluating 3 vendors. Timeline is Q3. Strong interest in the analytics module.', timestamp: '2026-05-22T10:00:00Z', user: 'Jordan Lee' },
  { id: 'a3', contactId: 'c1', type: 'note', title: 'Note added', body: 'Sophia mentioned they are scaling to 200+ engineers by EOY. Upsell opportunity for Enterprise plan.', timestamp: '2026-05-20T09:15:00Z', user: 'Alex Chen' },
  { id: 'a4', contactId: 'c12', type: 'stage_change', title: 'Deal moved to Won', body: 'Ironclad Security signed the $84K annual contract. Contract executed by DocuSign.', timestamp: '2026-04-15T16:45:00Z', user: 'Alex Chen' },
  { id: 'a5', contactId: 'c3', type: 'call', title: 'QBR call with Elena', body: 'Quarterly business review. Customer satisfaction is high. Exploring the AI features roadmap for Q3.', timestamp: '2026-05-27T11:00:00Z', user: 'Alex Chen' },
  { id: 'a6', contactId: 'c7', type: 'email', title: 'Proposal sent', body: 'Sent the Enterprise proposal deck and pricing sheet to Priya. Requested a follow-up call by end of week.', timestamp: '2026-05-19T15:20:00Z', user: 'Sam Park' },
  { id: 'a7', contactId: 'c20', type: 'meeting', title: 'Negotiation session — contract terms', body: 'Two-hour session on contract terms. Aisha wants a 3-year lock-in with annual price escalation capped at 5%. Legal reviewing.', timestamp: '2026-05-23T14:00:00Z', user: 'Jordan Lee' },
  { id: 'a8', contactId: 'c10', type: 'stage_change', title: 'Deal closed — Won!', body: 'Omar confirmed the $61K deal. Kicked off implementation with success team.', timestamp: '2026-03-22T17:00:00Z', user: 'Sam Park' },
  { id: 'a9', contactId: 'c14', type: 'note', title: 'Legal review in progress', body: 'Kevin\'s legal team is reviewing the MSA. ETA 2 weeks. Stay the course on the $43K deal.', timestamp: '2026-05-25T13:30:00Z', user: 'Jordan Lee' },
  { id: 'a10', contactId: 'c11', type: 'email', title: 'Proposal follow-up', body: 'Following up on the $38K proposal sent last week. Natalie was out of office — reconnecting.', timestamp: '2026-05-21T10:45:00Z', user: 'Jordan Lee' },
  { id: 'a11', contactId: 'c2', type: 'note', title: 'Competitor intel', body: 'Marcus mentioned they\'re also evaluating Salesforce. We need to push on ROI data and faster onboarding.', timestamp: '2026-05-23T08:30:00Z', user: 'Jordan Lee' },
  { id: 'a12', contactId: 'c18', type: 'deal_update', title: 'Contract value increased', body: 'Claire approved the expanded scope — deal grew from $84K to $96K. Added compliance module.', timestamp: '2026-04-28T11:00:00Z', user: 'Alex Chen' },
  { id: 'a13', contactId: 'c4', type: 'email', title: 'Intro email sent', body: 'Hi James, I came across ScaleHub and I\'d love to show you how MarqueCRM can accelerate your growth motion.', timestamp: '2026-05-12T09:00:00Z', user: 'Sam Park' },
  { id: 'a14', contactId: 'c15', type: 'meeting', title: 'Product demo', body: 'Gave Yuki a full demo of the platform. Very interested in the mobile app. Asking for Japanese localization timeline.', timestamp: '2026-05-24T03:00:00Z', user: 'Alex Chen' },
  { id: 'a15', contactId: 'c1', type: 'call', title: 'Support escalation resolved', body: 'Resolved the SSO configuration issue with Sophia\'s team. Call lasted 20 minutes. Team is unblocked.', timestamp: '2026-05-15T16:00:00Z', user: 'Alex Chen' },
]

export const revenueData: RevenuePoint[] = [
  { month: 'Jun \'25', revenue: 42000, target: 45000 },
  { month: 'Jul \'25', revenue: 48500, target: 50000 },
  { month: 'Aug \'25', revenue: 51200, target: 52000 },
  { month: 'Sep \'25', revenue: 55800, target: 55000 },
  { month: 'Oct \'25', revenue: 61400, target: 60000 },
  { month: 'Nov \'25', revenue: 58900, target: 65000 },
  { month: 'Dec \'25', revenue: 72300, target: 70000 },
  { month: 'Jan \'26', revenue: 68100, target: 72000 },
  { month: 'Feb \'26', revenue: 79400, target: 75000 },
  { month: 'Mar \'26', revenue: 84700, target: 80000 },
  { month: 'Apr \'26', revenue: 91200, target: 88000 },
  { month: 'May \'26', revenue: 96800, target: 95000 },
]

export const stageLabels: Record<DealStage, string> = {
  new: 'New Lead',
  qualified: 'Qualified',
  proposal: 'Proposal Sent',
  negotiation: 'Negotiation',
  won: 'Closed Won',
  lost: 'Closed Lost',
}

export const stageOrder: DealStage[] = ['new', 'qualified', 'proposal', 'negotiation', 'won', 'lost']

export const teamMembers = ['Alex Chen', 'Jordan Lee', 'Sam Park']
