
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Wrench } from "lucide-react";

export default function ServicesDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <h1 className="font-headline text-4xl font-bold">Service Provider Dashboard</h1>
        <p className="text-muted-foreground">This is the dashboard a service provider would see.</p>
      </div>
      <Card className="text-center p-12">
        <Wrench className="mx-auto h-12 w-12 text-muted-foreground" />
        <CardHeader>
          <CardTitle>Welcome, Service Provider!</CardTitle>
          <CardDescription>Manage your profile, view job requests, and communicate with clients.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">This page is a placeholder for the vendor-specific dashboard.</p>
        </CardContent>
      </Card>
    </div>
  );
}
