
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

export default function AdminNewServiceProviderPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <h1 className="font-headline text-4xl font-bold">Add New Service Provider</h1>
        <p className="text-muted-foreground">Add a new professional to the services directory.</p>
      </div>
      <form className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Provider Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Provider Name</Label>
              <Input id="name" placeholder="e.g., Quick Plumbers" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="category">Service Category</Label>
              <Input id="category" placeholder="e.g., Plumbing" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="location">Location / Service Area</Label>
              <Input id="location" placeholder="e.g., Nairobi" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                rows={4}
                placeholder="Describe the provider and their services..."
              />
            </div>
             <div className="space-y-2">
                <Label>Provider Photo</Label>
                 <Input type="file" disabled/>
                 <p className="text-sm text-muted-foreground">Image upload will be available soon.</p>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit" disabled>
              Add Provider
          </Button>
        </div>
      </form>
    </div>
  );
}
