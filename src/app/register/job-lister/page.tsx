
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Briefcase, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function JobListerRegistrationPage() {
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
      description: "Your company profile has been submitted for review. You can now post jobs.",
    });

    setIsSubmitting(false);
    router.push('/service-hub');
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8 text-center">
        <Briefcase className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="font-headline text-4xl font-bold text-primary">Recruiter / Employer Registration</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Find the best talent by posting your job openings on Sokko Jobs.
        </p>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Company Profile</CardTitle>
            <CardDescription>Create a company profile to start posting jobs.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input id="company-name" required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="contact-email">Contact Email</Label>
                    <Input id="contact-email" type="email" required />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="website">Company Website</Label>
                    <Input id="website" placeholder="https://"/>
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="address">Company Headquarters</Label>
                <Input id="address" placeholder="e.g., Nairobi, Kenya" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="about">About the Company</Label>
                <Textarea id="about" placeholder="Give a brief overview of your company, its mission, and culture." required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="company-logo">Company Logo</Label>
                <Input id="company-logo" type="file" accept="image/*" required />
            </div>
            <div className="flex justify-end gap-2">
                <Button variant="outline" type="button" onClick={() => router.back()} disabled={isSubmitting}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                  Create Company Profile
                </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
