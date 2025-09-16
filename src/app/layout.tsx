import type { Metadata } from "next";
import { AppHeader } from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { Sidebar, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { AuthProvider } from "@/context/auth-context";

export const metadata: Metadata = {
  title: "Sokko Sasa - Your Online Marketplace",
  description: "Buy and sell anything in Kenya.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
              <AppSidebar />
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
