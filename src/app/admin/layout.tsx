
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Add authentication logic here to protect this route.
  // For example, redirect to /login if the user is not an admin.

  return <main className="flex-1">{children}</main>;
}
