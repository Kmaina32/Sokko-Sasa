
import { getAdminDashboardStats } from "@/lib/firestore";
import { StatCard } from "@/components/stat-card";
import { Users, Package, Calendar, Utensils } from "lucide-react";


export default async function AdminPage() {
  const stats = await getAdminDashboardStats();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <h1 className="font-headline text-4xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome! Here's a summary of your marketplace.</p>
      </div>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Users"
            value={stats.users.toString()}
            icon={Users}
            description="Total registered users on the platform."
            color="orange"
          />
          <StatCard
            title="Total Products"
            value={stats.listings.toString()}
            icon={Package}
            description="Total products and services listed."
            color="blue"
          />
          <StatCard
            title="Total Events"
            value={stats.events.toString()}
            icon={Calendar}
            description="Number of event listings."
            color="green"
          />
           <StatCard
            title="Total Restaurants"
            value={stats.restaurants.toString()}
            icon={Utensils}
            description="Number of food delivery partners."
            color="red"
          />
      </div>

      <div className="mt-8">
        {/* Future sections for recent activity or charts can go here */}
      </div>
    </div>
  );
}
