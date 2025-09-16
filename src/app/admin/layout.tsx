import { AdminSidebar } from "@/components/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Add authentication logic here to protect this route.
  // For example, redirect to /login if the user is not an admin.

  return (
    <>
      <AdminSidebar />
      <main className="flex-1">{children}</main>
    </>
  );
}
