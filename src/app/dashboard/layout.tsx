'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { VendorSidebar } from '@/components/vendor-sidebar';
import type { User } from '@/lib/types';

// Define which user types are considered vendors
const VENDOR_TYPES: User['type'][] = ['Vendor', 'Driver', 'Admin'];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user) {
      router.replace('/login');
      return;
    }
    
    // In a real app, you would fetch user data from your DB to check their type
    // For now, we'll simulate it based on the email for admin or assume a 'type' property
    const userType = user.email === 'gmaina424@gmail.com' ? 'Admin' : (user as any).type || 'Client';

    if (VENDOR_TYPES.includes(userType)) {
      setIsAuthorized(true);
    } else {
      // If not a vendor, redirect away
      router.replace('/');
    }
    setLoading(false);

  }, [user, authLoading, router]);

  if (loading || authLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthorized) {
    // This is a fallback while redirecting
    return null;
  }

  // Determine dashboard type from URL, e.g., '/dashboard/food' -> 'food'
  const dashboardType = pathname.split('/')[2] || '';

  return (
    <div className="flex">
        <VendorSidebar dashboardType={dashboardType} />
        <main className="flex-1 pl-64"> {/* Add padding to account for sidebar width */}
            {children}
        </main>
    </div>
  );
}
