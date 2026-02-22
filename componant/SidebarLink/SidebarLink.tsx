"use client";     
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarLinkProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

 export const SidebarLink = ({ icon, label, href }: SidebarLinkProps) => {
  const pathname = usePathname();
  
  const isActive = pathname === href;

  return (
    <Link 
      href={href}
      data-active={isActive}
      className={`flex items-center gap-3 w-full p-3 rounded-xl transition-all duration-300
        text-gray-300 hover:bg-[#e6683c]/10 hover:text-white
        data-[active=true]:bg-[#e6683c] data-[active=true]:text-white data-[active=true]:shadow-lg
      `}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
};