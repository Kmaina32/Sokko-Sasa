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
import { Home, ShoppingBag, Utensils, Calendar, MessageSquare, Car, Wrench, Building, HeartPulse, Briefcase, Shield, Settings } from "lucide-react";
import { usePathname } from 'next/navigation';


const mainLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/shop", label: "Shop", icon: ShoppingBag },
    { href: "/food", label: "Food Delivery", icon: Utensils },
    { href: "/events", label: "Events", icon: Calendar },
    { href: "/messages", label: "Sokko Chat", icon: MessageSquare },
];

const servicesLinks = [
    { href: "/rides", label: "Rides", icon: Car },
    { href: "/services", label: "Services", icon: Wrench },
    { href: "/real-estate", label: "Real Estate", icon: Building },
    { href: "/medical", label: "Medical", icon: HeartPulse },
    { href: "/jobs", label: "Jobs", icon: Briefcase },
    { href: "/insurance", label: "Insurance", icon: Shield },
    { href: "/service-hub", label: "Service Hub", icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-3">
          <SokkoSasaLogo className="h-10 w-10 text-primary" />
          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-primary">Sokko Sasa</h2>
            <p className="text-sm text-muted-foreground">Africa's Smart Marketplace</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="border-r-4 border-orange-500 pr-0">
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarMenu>
            {mainLinks.map((link) => (
              <SidebarMenuItem key={link.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === link.href}
                  className="[&[data-active=true]]:bg-orange-100 [&[data-active=true]]:text-orange-600 [&[data-active=true]]:font-semibold"
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
         <SidebarGroup>
          <SidebarGroupLabel>Services</SidebarGroupLabel>
          <SidebarMenu>
            {servicesLinks.map((link) => (
              <SidebarMenuItem key={link.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === link.href}
                  className="[&[data-active=true]]:bg-orange-100 [&[data-active=true]]:text-orange-600 [&[data-active=true]]:font-semibold"
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
        <p className="text-xs text-muted-foreground">&copy; 2025 Sokko Sasa by Mill...</p>
      </SidebarFooter>
    </>
  );
}
