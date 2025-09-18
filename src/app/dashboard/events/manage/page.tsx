
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Calendar } from "lucide-react";

export default function ManageEventsDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-headline text-4xl font-bold">Manage Events</h1>
          <p className="text-muted-foreground">Create, edit, and view your event listings.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Event
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Events</CardTitle>
          <CardDescription>
            A list of all your active and past events.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-12 border-2 border-dashed rounded-lg">
            <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-xl font-semibold">No Events Created</h3>
            <p className="mt-2 text-muted-foreground">
              Click "Create New Event" to get started.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
