"use client";
import Link from 'next/link';
import { ReactNode } from 'react';

interface SidebarLinkProps {
  href: string;
  icon: ReactNode;
  label: string;
  onClick?: () => void; 
}

export const SidebarLink = ({ href, icon, label, onClick }: SidebarLinkProps) => {
  return (
    <Link 
      href={href} 
      onClick={onClick} 
      className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-200 group"
    >
      <div className="text-white/70 group-hover:text-white transition-colors">
        {icon}
      </div>
      <span className="font-medium text-white/90 group-hover:text-white">
        {label}
      </span>
    </Link>
  );
};