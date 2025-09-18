
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Utensils, DollarSign, ClipboardList, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/stat-card";

export default function FoodDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold">Restaurant Overview</h1>
        <p className="text-muted-foreground">Here's what's happening at your restaurant today.</p>
      </div>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Today's Sales"
            value="KES 12,450"
            icon={DollarSign}
            description="+20.1% from last day"
            color="green"
          />
          <StatCard
            title="Today's Orders"
            value="+25"
            icon={ClipboardList}
            description="5 pending confirmation"
            color="orange"
          />
          <StatCard
            title="Active Deliveries"
            value="3"
            icon={Utensils}
            description="1 delivery is running late"
            color="blue"
          />
           <StatCard
            title="Most Popular Item"
            value="Nyama Choma"
            icon={TrendingUp}
            description="5 units sold today"
            color="red"
          />
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
            <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>A list of your most recent orders.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Recent orders will be displayed here.</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Performance</CardTitle>
                <CardDescription>Your sales analytics for the past week.</CardDescription>
            </CardHeader>
            <CardContent>
                 <p className="text-muted-foreground">Sales charts will be displayed here.</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
