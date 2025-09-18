
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { ClipboardList } from "lucide-react";

export default function FoodOrdersDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold">Order Management</h1>
        <p className="text-muted-foreground">View and manage incoming and active orders.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Incoming Orders</CardTitle>
          <CardDescription>
            A list of new orders that need your confirmation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-12 border-2 border-dashed rounded-lg">
            <ClipboardList className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-xl font-semibold">No New Orders</h3>
            <p className="mt-2 text-muted-foreground">
              New customer orders will appear here automatically.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
