
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Car } from "lucide-react";

export default function RidesDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <h1 className="font-headline text-4xl font-bold">Driver Dashboard</h1>
        <p className="text-muted-foreground">This is the dashboard a driver partner would see.</p>
      </div>
      <Card className="text-center p-12">
        <Car className="mx-auto h-12 w-12 text-muted-foreground" />
        <CardHeader>
          <CardTitle>Welcome, Driver Partner!</CardTitle>
          <CardDescription>View your ride history, earnings, and ratings. Toggle your availability here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">This page is a placeholder for the vendor-specific dashboard.</p>
        </CardContent>
      </Card>
    </div>
  );
}
