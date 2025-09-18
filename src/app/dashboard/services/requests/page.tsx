
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Wrench } from "lucide-react";

export default function ServiceRequestsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold">Job Requests</h1>
        <p className="text-muted-foreground">View incoming service requests from clients.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Requests</CardTitle>
          <CardDescription>
            Incoming job requests will be listed here for you to accept or decline.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-12 border-2 border-dashed rounded-lg">
            <Wrench className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-xl font-semibold">No New Job Requests</h3>
            <p className="mt-2 text-muted-foreground">
              Potential clients will contact you through your profile page.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
