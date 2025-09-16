import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Wrench } from "lucide-react";

export default function ServiceProviderRegistrationPage() {
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
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="full-name">Full Name / Company Name</Label>
                    <Input id="full-name" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="service-category">Primary Service Category</Label>
                <Select>
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
                <Input id="location" placeholder="e.g., Nairobi and its environs" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="bio">Short Bio / Description of Services</Label>
                <Textarea id="bio" placeholder="Describe your experience and the services you offer..." />
            </div>
            <div className="space-y-2">
                <Label htmlFor="profile-photo">Profile Photo</Label>
                <Input id="profile-photo" type="file" accept="image/*" />
                <p className="text-xs text-muted-foreground">A clear photo of yourself or your company logo.</p>
            </div>
            <div className="flex justify-end">
                <Button type="submit">Create Profile</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
