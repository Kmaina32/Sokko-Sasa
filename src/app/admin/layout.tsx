import { AppHeader } from "@/components/header";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Sidebar, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Add authentication logic here to protect this route.
  // For example, redirect to /login if the user is not an admin.

  return (
    <SidebarProvider>
      <Sidebar>
        <AdminSidebar />
      </Sidebar>
      <SidebarInset>
        {/* We can have a specific AdminHeader or reuse the AppHeader */}
        <AppHeader />
        <main className="flex-1">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
