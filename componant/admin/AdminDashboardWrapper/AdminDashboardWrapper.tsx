"use client";
import { useState } from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import { AdminSidebar } from '../AdminSidebar/AdminSidebar';
import { AdminDashboardOverview } from '@/componant/AdminDashboardOverview/AdminDashboardOverview'; 
import { AdminOrdersList } from '@/componant/AdminOrdersList/AdminOrdersList';

export default function AdminDashboardWrapper({ pageNumber }: { pageNumber: number }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f9fafb]">
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu size={24}/>
            </button>
            <div className="hidden md:flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
              <Search size={18} className="text-gray-400" />
              <input type="text" placeholder="Search orders..." className="bg-transparent border-none outline-none text-sm w-64" />
            </div>
          </div>

          <div className="flex items-center gap-3">
             <button className="p-2 text-gray-400 hover:text-[#771011] transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
             </button>
          </div>
        </header>

        <div className="p-4 md:p-8">
          <div className="mb-8">
            <h1 className="font-['Oswald'] text-3xl md:text-4xl font-bold text-[#771011] uppercase tracking-tight">
              Store Overview
            </h1>
            <p className="text-gray-500 text-sm mt-1">Manage your business metrics and recent activity.</p>
          </div>

          <AdminDashboardOverview />

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-50">
              <h2 className="font-['Oswald'] text-xl font-bold text-gray-800">Recent Transactions</h2>
            </div>
            <AdminOrdersList pageNumber={pageNumber} />
          </div>
        </div>
      </main>
    </div>
  );
}