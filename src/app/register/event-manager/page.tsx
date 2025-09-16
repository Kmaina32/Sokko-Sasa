import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "lucide-react";

export default function EventManagerRegistrationPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8 text-center">
        <Calendar className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="font-headline text-4xl font-bold text-primary">Event Manager Registration</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          List your events on Sokko Sasa and reach a wider audience.
        </p>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Organizer Details</CardTitle>
            <CardDescription>Tell us about you or your organization.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="organizer-name">Organizer/Company Name</Label>
              <Input id="organizer-name" placeholder="e.g., Awesome Events Inc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-person">Contact Person Name</Label>
              <Input id="contact-person" />
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" />
                </div>
            </div>
             <div className="space-y-2">
                <Label htmlFor="website">Website or Social Media Page</Label>
                <Input id="website" placeholder="https://"/>
            </div>
            <div className="space-y-2">
                <Label htmlFor="about">About the Organizer</Label>
                <Textarea id="about" placeholder="Describe the types of events you host..." />
            </div>
            <div className="flex justify-end">
                <Button type="submit">Submit Application</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
