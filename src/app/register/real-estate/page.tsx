
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Building, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function RealEstateAgentRegistrationPage() {
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
      description: "Thank you for registering. Your profile is now under review.",
    });

    setIsSubmitting(false);
    router.push('/service-hub');
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8 text-center">
        <Building className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="font-headline text-4xl font-bold text-primary">Real Estate Agent Registration</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Connect with buyers and renters by listing properties on Sokko Sasa.
        </p>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Agent / Agency Information</CardTitle>
            <CardDescription>Set up your profile to start listing properties.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="agent-name">Agent or Agency Name</Label>
              <Input id="agent-name" required />
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
                <Label htmlFor="license-number">Real Estate License Number (Optional)</Label>
                <Input id="license-number" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="website">Website (Optional)</Label>
                <Input id="website" placeholder="https://" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="about">About</Label>
                <Textarea id="about" placeholder="Tell potential clients about your experience and focus areas..." required />
            </div>
             <div className="space-y-2">
                <Label htmlFor="agent-photo">Profile Photo or Agency Logo</Label>
                <Input id="agent-photo" type="file" accept="image/*" required />
            </div>
            <div className="flex justify-end gap-2">
                <Button variant="outline" type="button" onClick={() => router.back()} disabled={isSubmitting}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                  Join as an Agent
                </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
