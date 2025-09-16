import { AdminSidebar } from "@/components/admin-sidebar";
import { AppHeader } from "@/components/header";
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
      <Sidebar collapsible="icon">
        <AdminSidebar />
      </Sidebar>
      <SidebarInset>
        <AppHeader />
        <main className="flex-1">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
