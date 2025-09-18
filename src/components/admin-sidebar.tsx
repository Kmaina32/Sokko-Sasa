
"use client";

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { SokkoSasaLogo } from "@/components/icons";
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
  Shield,
  BarChart2,
  Megaphone,
  LayoutDashboard,
} from "lucide-react";
import { usePathname } from 'next/navigation';

const adminLinks = [
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
    <>
      <SidebarHeader>
        <div className="flex items-center gap-3">
          <SokkoSasaLogo className="h-10 w-10 text-primary" />
          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-primary">Sokko Sasa</h2>
            <p className="text-sm text-muted-foreground">Admin Panel</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform Mgmt</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Admin Dashboard" isActive={pathname === '/admin'}>
                      <a href="/admin">
                        <LayoutDashboard className="h-5 w-5" />
                        <span>Admin Dashboard</span>
                    </a>
                </SidebarMenuButton>
            </SidebarMenuItem>
            {adminLinks.map((link) => (
              <SidebarMenuItem key={link.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(link.href)}
                  className="[&[data-active=true]]:bg-orange-100 [&[data-active=true]]:text-orange-600 [&[data-active=true]]:font-semibold"
                  tooltip={link.label}
                >
                  <a href={link.href}>
                    <link.icon className="h-5 w-5" />
                    <span>{link.label}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Back to App">
                    <a href="/">
                        <Home className="h-5 w-5" />
                        <span>Back to App</span>
                    </a>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
