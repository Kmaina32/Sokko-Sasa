import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Utensils } from "lucide-react";

export default function RestaurantRegistrationPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8 text-center">
        <Utensils className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="font-headline text-4xl font-bold text-primary">Restaurant Registration</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Join Sokko Food and start delivering to customers near you.
        </p>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Restaurant Details</CardTitle>
            <CardDescription>Fill out the form below to get your restaurant listed.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="restaurant-name">Restaurant Name</Label>
              <Input id="restaurant-name" placeholder="e.g., Mama's Kitchen" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cuisine-type">Cuisine Type</Label>
              <Input id="cuisine-type" placeholder="e.g., Kenyan, Italian, Indian" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Physical Address</Label>
              <Input id="address" placeholder="e.g., 123 Biashara St, Nairobi" />
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
                <Label htmlFor="menu">Menu (PDF or Link)</Label>
                <Input id="menu" type="file" accept=".pdf, .doc, .docx" />
                 <p className="text-xs text-muted-foreground">You can also provide a link to your online menu in the description.</p>
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Short Description</Label>
                <Textarea id="description" placeholder="Tell us a little about your restaurant..." />
            </div>
            <div className="flex justify-end">
                <Button type="submit">Submit for Approval</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
