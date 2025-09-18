
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Utensils } from "lucide-react";

export default function FoodDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <h1 className="font-headline text-4xl font-bold">Restaurant Dashboard</h1>
        <p className="text-muted-foreground">This is the dashboard a restaurant owner would see.</p>
      </div>
      <Card className="text-center p-12">
        <Utensils className="mx-auto h-12 w-12 text-muted-foreground" />
        <CardHeader>
          <CardTitle>Welcome, Restaurant Partner!</CardTitle>
          <CardDescription>Manage your menu, view orders, and track your performance here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">This page is a placeholder for the vendor-specific dashboard.</p>
        </CardContent>
      </Card>
    </div>
  );
}
