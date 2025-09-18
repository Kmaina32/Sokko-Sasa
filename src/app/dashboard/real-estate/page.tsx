
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Building } from "lucide-react";

export default function RealEstateDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <h1 className="font-headline text-4xl font-bold">Real Estate Dashboard</h1>
        <p className="text-muted-foreground">This is the dashboard a real estate agent would see.</p>
      </div>
      <Card className="text-center p-12">
        <Building className="mx-auto h-12 w-12 text-muted-foreground" />
        <CardHeader>
          <CardTitle>Welcome, Real Estate Agent!</CardTitle>
          <CardDescription>Manage your property listings, view inquiries, and schedule viewings.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">This page is a placeholder for the vendor-specific dashboard.</p>
        </CardContent>
      </Card>
    </div>
  );
}
