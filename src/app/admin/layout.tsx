
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import type { User } from '@/lib/types';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!user) {
      router.replace('/login');
      return;
    }

    const checkAdminStatus = () => {
      if (user.email === 'gmaina424@gmail.com') {
        setIsAdmin(true);
      } else {
        // Not an admin, redirect to home page or an 'unauthorized' page
        router.replace('/');
      }
      setLoading(false);
    };

    checkAdminStatus();

  }, [user, authLoading, router]);

  if (loading || authLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    // This is a fallback while redirecting
    return null;
  }

  return <main className="flex-1">{children}</main>;
}
