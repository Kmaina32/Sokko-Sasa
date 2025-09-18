
"use client";

import Link from 'next/link';
import {
  Home,
  Users,
  Package,
  Utensils,
  Calendar,
  Building,
  Briefcase,
  Wrench,
  Car,
  Megaphone,
  LayoutDashboard,
} from "lucide-react";
import { usePathname } from 'next/navigation';
import { SokkoSasaLogo } from './icons';
import { cn } from '@/lib/utils';


const adminLinks = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { href: "/admin/advertisements", label: "Ads", icon: Megaphone },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/food", label: "Food Delivery", icon: Utensils },
    { href: "/admin/events", label: "Events", icon: Calendar },
    { href: "/admin/real-estate", label: "Real Estate", icon: Building },
    { href: "/admin/jobs", label: "Jobs", icon: Briefcase },
    { href: "/admin/services", label: "Services", icon: Wrench },
    { href: "/admin/rides", label: "Rides", icon: Car },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
     <aside className="fixed left-0 top-0 h-screen w-64 flex-col border-r bg-background hidden md:flex">
        <div className="p-4 border-b">
            <Link href="/" className="flex items-center gap-3">
                <SokkoSasaLogo className="h-10 w-10 text-primary" />
                <div className="flex flex-col">
                    <h2 className="text-lg font-bold text-primary">Sokko Sasa</h2>
                    <p className="text-sm text-muted-foreground">Admin Panel</p>
                </div>
            </Link>
        </div>
      <nav className="flex-1 px-4 py-4">
        <ul className="space-y-1">
          {adminLinks.map((link) => {
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
        <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted">
            <Home className="h-5 w-5"/>
            Back to App
        </Link>
      </div>
    </aside>
  );
}
