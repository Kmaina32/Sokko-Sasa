
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";

export default function AdminNewDriverPage() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <h1 className="font-headline text-4xl font-bold">Add New Driver</h1>
        <p className="text-muted-foreground">Onboard a new driver partner to the platform.</p>
      </div>
      <form className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Driver Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Driver Name</Label>
              <Input id="name" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="vehicle">Vehicle Details</Label>
              <Input id="vehicle" placeholder="e.g., Toyota Vitz KDA 123X" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                 <Select>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select initial status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit" disabled>
              Add Driver
          </Button>
        </div>
      </form>
    </div>
  );
}
