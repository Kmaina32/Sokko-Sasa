import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase } from "lucide-react";

export default function JobListerRegistrationPage() {
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
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input id="company-name" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="contact-email">Contact Email</Label>
                    <Input id="contact-email" type="email" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="website">Company Website</Label>
                    <Input id="website" placeholder="https://"/>
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="address">Company Headquarters</Label>
                <Input id="address" placeholder="e.g., Nairobi, Kenya" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="about">About the Company</Label>
                <Textarea id="about" placeholder="Give a brief overview of your company, its mission, and culture." />
            </div>
            <div className="space-y-2">
                <Label htmlFor="company-logo">Company Logo</Label>
                <Input id="company-logo" type="file" accept="image/*" />
            </div>
            <div className="flex justify-end">
                <Button type="submit">Create Company Profile</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
