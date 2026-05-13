import Link from 'next/link';
import { 
  LayoutGrid, 
  User, 
  ShieldAlert, 
  FileText, 
  Cpu, 
  LogOut, 
  type LucideIcon 
} from 'lucide-react';
import type { ReactNode } from 'react';

import { cn } from '@/lib/cn';

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const navigation: NavItem[] = [
  { label: 'Overview', href: '/overview', icon: LayoutGrid },
  { label: 'Users', href: '/users', icon: User },
  { label: 'Expert Verifications', href: '/expert-verifications', icon: ShieldAlert },
  { label: 'Audit Logs', href: '/audit-logs', icon: FileText },
  { label: 'System Health', href: '/system-health', icon: Cpu },
];

export interface AdminLayoutProps {
  children: ReactNode;
  activePath?: string;
}

function NavigationLink({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={cn(
        'group relative flex items-center gap-3 px-6 py-3 text-[15px] transition-all',
        active 
          ? 'bg-[#1a233a] font-bold text-white' 
          : 'font-medium text-[#94a3b8] hover:text-white'
      )}
    >
      {/* Active Indicator: Thin vertical amber line on far-left edge */}
      {active && (
        <div className="absolute left-0 h-3/5 w-[3px] rounded-r-full bg-[#f59e0b]" />
      )}
      
      <Icon className={cn(
        'h-5 w-5 transition-colors', 
        active ? 'text-white' : 'text-[#64748b] group-hover:text-[#94a3b8]'
      )} />
      
      {/* Navigation labels: Clean sans-serif */}
      <span className="font-sans">{item.label}</span>
    </Link>
  );
}

export function AdminLayout({ children, activePath }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#FDF9F3]">
      {/* Sidebar: Deep navy blue background */}
      <aside className="fixed inset-y-0 left-0 z-20 flex w-64 flex-col bg-[#0D152B]">
        
        {/* Header & Branding */}
        <div className="flex items-center gap-3 px-6 py-10">
          <div className="relative flex h-8 w-12 items-center">
            {/* Logo: Overlapping warm golden ochre and solid cream circles */}
            <div className="absolute left-0 h-7 w-7 rounded-full bg-[#b48a4d] opacity-90 shadow-lg" />
            <div className="absolute left-4 h-7 w-7 rounded-full bg-[#FDF9F3] shadow-md" />
          </div>
          {/* Brand Name: High-contrast serif typeface */}
          <h1 className="font-serif text-3xl font-bold tracking-tight text-white">
            Lunas
          </h1>
        </div>

        {/* Primary Navigation Items */}
        <nav className="flex flex-1 flex-col gap-1">
          {navigation.map((item) => (
            <NavigationLink 
              key={item.href} 
              item={item} 
              active={activePath ? activePath === item.href : false} 
            />
          ))}
        </nav>

        {/* Footer Actions */}
        <div className="mt-auto">
          {/* Visual Separation: Thin, dark horizontal divider */}
          <div className="mx-6 border-t border-[#1e293b]" />
          
          <button className="flex w-full items-center gap-3 px-6 py-8 text-[15px] font-medium text-[#94a3b8] transition-colors hover:text-white">
            <LogOut className="h-5 w-5 text-[#64748b]" />
            <span className="font-sans">Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 pl-64">
        <div className="min-h-screen p-12">
          {children}
        </div>
      </main>
    </div>
  );
}