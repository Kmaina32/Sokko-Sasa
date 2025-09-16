
'use client';

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { SokkoSasaLogo } from '@/components/icons';
import {
  Home,
  ShoppingBag,
  Utensils,
  Calendar,
  MessageSquare,
  Car,
  Wrench,
  Building,
  HeartPulse,
  Briefcase,
  Shield,
  Settings,
  User,
  LogIn,
  LogOut,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/auth-context';

const mainLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/shop', label: 'Shop', icon: ShoppingBag },
  { href: '/food-delivery', label: 'Food Delivery', icon: Utensils },
  { href: '/events', label: 'Events', icon: Calendar },
  { href: '/messages', label: 'Sokko Chat', icon: MessageSquare },
];

const servicesLinks = [
  { href: '/rides', label: 'Rides', icon: Car },
  { href: '/services', label: 'Services', icon: Wrench },
  { href: '/real-estate', label: 'Real Estate', icon: Building },
  { href: '/medical', label: 'Medical', icon: HeartPulse },
  { href: '/jobs', label: 'Jobs', icon: Briefcase },
  { href: '/insurance', label: 'Insurance', icon: Shield },
  { href: '/service-hub', label: 'Service Hub', icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-3">
          <SokkoSasaLogo className="h-10 w-10 text-primary" />
          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-primary">Sokko Sasa</h2>
            <p className="text-sm text-muted-foreground">
              Africa's Smart Marketplace
            </p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarMenu>
            {mainLinks.map((link) => (
              <SidebarMenuItem key={link.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === link.href}
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
        <SidebarGroup>
          <SidebarGroupLabel>Services</SidebarGroupLabel>
          <SidebarMenu>
            {servicesLinks.map((link) => (
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
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarMenu>
            {user ? (
              <>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Profile">
                    <a href={`/profile/${user.uid}`}>
                      <User className="h-5 w-5" />
                      <span>Profile</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={logout}
                    asChild
                    tooltip="Log Out"
                  >
                    <a>
                      <LogOut className="h-5 w-5" />
                      <span>Log Out</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            ) : (
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === '/login'}
                  className="[&[data-active=true]]:bg-orange-100 [&[data-active=true]]:text-orange-600 [&[data-active=true]]:font-semibold"
                  tooltip="Login"
                >
                  <a href="/login">
                    <LogIn className="h-5 w-5" />
                    <span>Login</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
            {user && (
                 <SidebarMenuItem>
                 <SidebarMenuButton asChild tooltip="Admin" isActive={pathname.startsWith('/admin')}>
                     <a href="/admin">
                         <Settings className="h-5 w-5" />
                         <span>Admin</span>
                     </a>
                 </SidebarMenuButton>
             </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <p className="text-xs text-muted-foreground">
          &copy; 2025 Sokko Sasa
        </p>
      </SidebarFooter>
    </>
  );
}
