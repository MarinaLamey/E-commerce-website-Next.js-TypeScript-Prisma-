"use client"
import { useAdminOrderStore } from '@/store/useAdminOrderStore'

export const AdminDashboardOverview = () => {
    const totalRevenue = useAdminOrderStore((state) => state.totalRevenue);
    const avg = useAdminOrderStore((state) => state.avgOrderValue);
    const totalOrders = useAdminOrderStore((state) => state.totalOrders)

  return (
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
      <StatCard title="Total Revenue" value={`${totalRevenue} EGP`} change="+12.5%" color="border-b-[#e6683c]" />
      <StatCard title="Total Orders" value={totalOrders} change="+5.4%" color="border-b-[#771011]" />
      <StatCard title="Avg. Order Value" value={`${avg} EGP`} change="-1.2%" color="border-b-blue-500" />
    </div>
  )
}

const StatCard = ({ title, value, change, color }: any) => (
    <div className={`bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100 border-b-4 ${color} transition-transform hover:scale-[1.02]`}>
      <h3 className="text-gray-400 text-[10px] md:text-xs font-bold uppercase mb-2 tracking-wider">{title}</h3>
      <div className="flex justify-between items-end">
        <span className="text-xl md:text-2xl font-bold text-neutral-800 tracking-tight">{value}</span>
        <span className={`text-[10px] font-black px-2 py-1 rounded-md ${change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
            {change}
        </span>
      </div>
    </div>
);