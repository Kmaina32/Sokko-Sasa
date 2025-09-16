
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Wrench, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function ServiceProviderRegistrationPage() {
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
      title: "Profile Created!",
      description: "Your service provider profile is now under review. We'll notify you upon approval.",
    });

    setIsSubmitting(false);
    router.push('/service-hub');
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8 text-center">
        <Wrench className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="font-headline text-4xl font-bold text-primary">Service Provider Registration</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Offer your professional services to thousands of users on Sokko Sasa.
        </p>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>Create your provider profile to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="full-name">Full Name / Company Name</Label>
                    <Input id="full-name" required/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" required/>
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="service-category">Primary Service Category</Label>
                <Select required>
                    <SelectTrigger id="service-category">
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="plumbing">Plumbing</SelectItem>
                        <SelectItem value="electrical">Electrical</SelectItem>
                        <SelectItem value="appliance_repair">Appliance Repair</SelectItem>
                        <SelectItem value="handyman">Handyman</SelectItem>
                        <SelectItem value="mechanic">Mechanic</SelectItem>
                        <SelectItem value="cleaning">Cleaning</SelectItem>
                        <SelectItem value="tutoring">Tutoring</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <div className="space-y-2">
                <Label htmlFor="location">Service Area</Label>
                <Input id="location" placeholder="e.g., Nairobi and its environs" required/>
            </div>
            <div className="space-y-2">
                <Label htmlFor="bio">Short Bio / Description of Services</Label>
                <Textarea id="bio" placeholder="Describe your experience and the services you offer..." required/>
            </div>
            <div className="space-y-2">
                <Label htmlFor="profile-photo">Profile Photo</Label>
                <Input id="profile-photo" type="file" accept="image/*" required/>
                <p className="text-xs text-muted-foreground">A clear photo of yourself or your company logo.</p>
            </div>
            <div className="flex justify-end gap-2">
                <Button variant="outline" type="button" onClick={() => router.back()} disabled={isSubmitting}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                  Create Profile
                </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
