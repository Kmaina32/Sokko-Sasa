
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function EventManagerRegistrationPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // In a real app, you'd save this to a 'pendingRegistrations' collection in Firestore.
    // We'll simulate an API call.
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Application Submitted!",
      description: "Thank you for registering. Your application is under review.",
    });

    setIsSubmitting(false);
    router.push('/service-hub');
  };

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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="organizer-name">Organizer/Company Name</Label>
              <Input id="organizer-name" placeholder="e.g., Awesome Events Inc." required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-person">Contact Person Name</Label>
              <Input id="contact-person" required />
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" required />
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
            <div className="flex justify-end gap-2">
                <Button variant="outline" type="button" onClick={() => router.back()} disabled={isSubmitting}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                    Submit Application
                </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
