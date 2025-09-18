
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default function EventsDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <h1 className="font-headline text-4xl font-bold">Event Manager Dashboard</h1>
        <p className="text-muted-foreground">This is the dashboard an event manager would see.</p>
      </div>
      <Card className="text-center p-12">
        <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
        <CardHeader>
          <CardTitle>Welcome, Event Manager!</CardTitle>
          <CardDescription>Manage your event listings, track ticket sales, and view attendee analytics.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">This page is a placeholder for the vendor-specific dashboard.</p>
        </CardContent>
      </Card>
    </div>
  );
}
