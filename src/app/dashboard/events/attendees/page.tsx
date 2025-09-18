
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function AttendeesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold">Attendee Management</h1>
        <p className="text-muted-foreground">View and manage your attendee lists.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Attendees</CardTitle>
          <CardDescription>
            Lists of attendees for each of your events.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-12 border-2 border-dashed rounded-lg">
            <Users className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-xl font-semibold">No Attendees Yet</h3>
            <p className="mt-2 text-muted-foreground">
              When tickets are purchased, your attendee lists will appear here.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
