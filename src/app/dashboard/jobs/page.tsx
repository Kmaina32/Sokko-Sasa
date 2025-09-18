
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

export default function JobsDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <h1 className="font-headline text-4xl font-bold">Recruiter Dashboard</h1>
        <p className="text-muted-foreground">This is the dashboard a job lister or recruiter would see.</p>
      </div>
      <Card className="text-center p-12">
        <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
        <CardHeader>
          <CardTitle>Welcome, Recruiter!</CardTitle>
          <CardDescription>Post new job openings, manage applications, and find the perfect candidates.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">This page is a placeholder for the vendor-specific dashboard.</p>
        </CardContent>
      </Card>
    </div>
  );
}
