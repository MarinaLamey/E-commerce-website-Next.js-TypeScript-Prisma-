"use client";
import { SidebarLink } from '../SidebarLink/SidebarLink'; 
import { LayoutDashboard, ShoppingBag, ListTree, LogOut, X } from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const AdminSidebar = ({ isOpen, setIsOpen }: AdminSidebarProps) => {
  const handleClose = () => setIsOpen(false);

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
          onClick={handleClose}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-[70] w-72 bg-[#771011] text-white flex flex-col shadow-2xl transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:static lg:h-screen lg:w-64
      `}>
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h2 className="font-['Oswald'] text-2xl font-bold tracking-tighter uppercase">
            <span className="text-[#e6683c]">N-</span>NEGMCARTILLA
          </h2>
          <button className="lg:hidden p-2 hover:bg-white/10 rounded-full" onClick={handleClose}>
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          <SidebarLink href="/admin/dashboard" icon={<LayoutDashboard size={20}/>} label="Dashboard" onClick={handleClose} />
          <SidebarLink href="/admin/AddProductPage" icon={<ShoppingBag size={20}/>} label="Products" onClick={handleClose} />
          <SidebarLink href="/admin/add-category" icon={<ListTree size={20}/>} label="Categories" onClick={handleClose} />
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-red-900 transition-colors text-red-200">
            <LogOut size={20}/>
            <span className="font-bold">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};