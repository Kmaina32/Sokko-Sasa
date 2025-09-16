
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

export default function AdminNewRestaurantPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <h1 className="font-headline text-4xl font-bold">Add New Restaurant</h1>
        <p className="text-muted-foreground">Onboard a new food delivery partner.</p>
      </div>
      <form className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Restaurant Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Restaurant Name</Label>
              <Input id="name" placeholder="e.g., Mama's Kitchen" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="cuisine">Cuisine Type</Label>
              <Input id="cuisine" placeholder="e.g., Kenyan, Indian" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="e.g., Westlands" />
            </div>
             <div className="space-y-2">
                <Label>Restaurant Image</Label>
                 <Input type="file" disabled/>
                 <p className="text-sm text-muted-foreground">Image upload will be available soon.</p>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-end gap-2 p-6 pt-0">
          <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit" disabled>
              Add Restaurant
          </Button>
        </div>
      </form>
    </div>
  );
}
