
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminNewEventPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <h1 className="font-headline text-4xl font-bold">Create New Event</h1>
        <p className="text-muted-foreground">Fill in the details to add a new event listing.</p>
      </div>
      <form className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Event Name</Label>
              <Input id="title" placeholder="e.g., Nairobi Tech Week" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="e.g., KICC, Nairobi" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={4}
                placeholder="Describe the event..."
              />
            </div>
             <div className="space-y-2">
                <Label>Promotional Image</Label>
                 <Input type="file" disabled/>
                 <p className="text-sm text-muted-foreground">Image upload will be available soon.</p>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-end gap-2 p-6 pt-0">
          <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit" disabled>
              Create Event
          </Button>
        </div>
      </form>
    </div>
  );
}
