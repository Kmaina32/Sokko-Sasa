import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building } from "lucide-react";

export default function RealEstateAgentRegistrationPage() {
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
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="agent-name">Agent or Agency Name</Label>
              <Input id="agent-name" />
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
                <Label htmlFor="license-number">Real Estate License Number (Optional)</Label>
                <Input id="license-number" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="website">Website (Optional)</Label>
                <Input id="website" placeholder="https://" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="about">About</Label>
                <Textarea id="about" placeholder="Tell potential clients about your experience and focus areas..." />
            </div>
             <div className="space-y-2">
                <Label htmlFor="agent-photo">Profile Photo or Agency Logo</Label>
                <Input id="agent-photo" type="file" accept="image/*" />
            </div>
            <div className="flex justify-end">
                <Button type="submit">Join as an Agent</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
