
'use client';

import {
  Home,
  Utensils,
  ClipboardList,
  Car,
  DollarSign,
  BarChart2,
  Calendar,
  Ticket,
  Users,
  Settings,
  Building,
  Briefcase,
  Wrench,
  LayoutDashboard,
  History,
  FileText,
  UserCheck,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { SokkoSasaLogo } from './icons';

const sidebarConfig = {
  food: [
    { href: '/dashboard/food', label: 'Overview', icon: LayoutDashboard, exact: true },
    { href: '/dashboard/food/orders', label: 'Orders', icon: ClipboardList },
    { href: '/dashboard/food/menu', label: 'Menu Management', icon: Utensils },
    { href: '/dashboard/food/analytics', label: 'Analytics', icon: BarChart2 },
  ],
  rides: [
    { href: '/dashboard/rides', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { href: '/dashboard/rides/history', label: 'Ride History', icon: History },
    { href: '/dashboard/rides/earnings', label: 'Earnings', icon: DollarSign },
  ],
  events: [
    { href: '/dashboard/events', label: 'Overview', icon: LayoutDashboard, exact: true },
    { href: '/dashboard/events/manage', label: 'Manage Events', icon: Calendar },
    { href: '/dashboard/events/tickets', label: 'Ticket Sales', icon: Ticket },
    { href: '/dashboard/events/attendees', label: 'Attendees', icon: Users },
  ],
  services: [
    { href: '/dashboard/services', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { href: '/dashboard/services/requests', label: 'Job Requests', icon: Wrench },
    { href: '/dashboard/services/profile', label: 'My Profile', icon: Settings },
  ],
  'real-estate': [
    { href: '/dashboard/real-estate', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { href: '/dashboard/real-estate/listings', label: 'My Listings', icon: Building },
    { href: '/dashboard/real-estate/inquiries', label: 'Inquiries', icon: Users },
  ],
  jobs: [
    { href: '/dashboard/jobs', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { href: '/dashboard/jobs/postings', label: 'My Postings', icon: Briefcase },
    { href: '/dashboard/jobs/applicants', label: 'Applicants', icon: UserCheck },
  ],
};

const getDashboardTitle = (type: string) => {
    switch (type) {
        case 'food': return 'Restaurant';
        case 'rides': return 'Driver';
        case 'events': return 'Events';
        case 'services': return 'Service';
        case 'real-estate': return 'Real Estate';
        case 'jobs': return 'Recruiter';
        default: return 'Vendor';
    }
}


export function VendorSidebar({ dashboardType }: { dashboardType: string }) {
  const pathname = usePathname();
  const links = (sidebarConfig as any)[dashboardType] || [];
  const title = getDashboardTitle(dashboardType);

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 flex-col border-r bg-background hidden md:flex">
        <div className="p-4 border-b">
            <Link href="/" className="flex items-center gap-3">
                <SokkoSasaLogo className="h-10 w-10 text-primary" />
                <div className="flex flex-col">
                    <h2 className="text-lg font-bold text-primary">{title}</h2>
                    <p className="text-sm text-muted-foreground">Dashboard</p>
                </div>
            </Link>
        </div>
      <nav className="flex-1 px-4 py-4">
        <ul className="space-y-1">
          {links.map((link: any) => {
            const isActive = link.exact ? pathname === link.href : pathname.startsWith(link.href);
            return (
                <li key={link.href}>
                <Link
                    href={link.href}
                    className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted',
                    isActive && 'bg-muted text-primary font-semibold'
                    )}
                >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                </Link>
                </li>
            )
          })}
        </ul>
      </nav>
      <div className="mt-auto p-4 border-t">
        <Link href="/service-hub" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted">
            <Settings className="h-5 w-5"/>
            Back to Service Hub
        </Link>
        <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted">
            <Home className="h-5 w-5"/>
            Back to App Home
        </Link>
      </div>
    </aside>
  );
}
