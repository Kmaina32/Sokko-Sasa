
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

export default function AdminNewPropertyPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <h1 className="font-headline text-4xl font-bold">Create New Property Listing</h1>
        <p className="text-muted-foreground">Add a new property for sale or rent.</p>
      </div>
      <form className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Property Title</Label>
              <Input id="title" placeholder="e.g., 3 Bedroom Apartment in Kileleshwa" />
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="type">Listing Type</Label>
                    <Select>
                    <SelectTrigger id="type">
                        <SelectValue placeholder="Select listing type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Rent">For Rent</SelectItem>
                        <SelectItem value="Sale">For Sale</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="price">Price (KES)</Label>
                    <Input id="price" type="number" />
                </div>
            </div>
             <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="e.g., Kileleshwa, Nairobi" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={6}
                placeholder="Describe the property, amenities, etc..."
              />
            </div>
             <div className="space-y-2">
                <Label>Property Images</Label>
                 <Input type="file" multiple disabled/>
                 <p className="text-sm text-muted-foreground">Image upload will be available soon.</p>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit" disabled>
              Create Listing
          </Button>
        </div>
      </form>
    </div>
  );
}
