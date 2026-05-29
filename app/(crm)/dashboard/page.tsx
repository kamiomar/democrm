import { StatsCards } from '@/components/dashboard/stats-cards'
import { RevenueChart } from '@/components/dashboard/revenue-chart'
import { PipelineChart } from '@/components/dashboard/pipeline-chart'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { TopDeals } from '@/components/dashboard/top-deals'

export default function DashboardPage() {
  return (
    <div className="space-y-6 max-w-7xl">
      <StatsCards />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <PipelineChart />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RecentActivity />
        <TopDeals />
      </div>
    </div>
  )
}
