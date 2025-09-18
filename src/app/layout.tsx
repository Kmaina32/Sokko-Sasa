
'use client';

import type { Metadata } from "next";
import { AppHeader } from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { Sidebar, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AdminSidebar } from "@/components/admin-sidebar";
import { AuthProvider } from "@/context/auth-context";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { seedDatabase } from "@/lib/firestore";

// The metadata object is commented out because it cannot be used in a Client Component.
// export const metadata: Metadata = {
//   title: "Sokko Sasa - Your Online Marketplace",
//   description: "Buy and sell anything in Kenya.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  useEffect(() => {
    // This is for development purposes to easily seed the database.
    // In a production app, you would have a more secure, admin-only interface to trigger this.
    seedDatabase();
  }, []);


  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Sokko Sasa - Your Online Marketplace</title>
        <meta name="description" content="Buy and sell anything in Kenya." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <AuthProvider>
          <SidebarProvider>
            <Sidebar collapsible="icon">
              {isAdmin ? <AdminSidebar /> : <AppSidebar />}
            </Sidebar>
            <SidebarInset>
              <AppHeader />
              <main className="flex-1">{children}</main>
            </SidebarInset>
          </SidebarProvider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
