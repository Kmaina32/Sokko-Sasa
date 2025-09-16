
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Car, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DriverRegistrationPage() {
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
      title: "Application Submitted!",
      description: "Thank you for registering. Your application is under review and we will contact you shortly.",
    });

    setIsSubmitting(false);
    router.push('/service-hub');
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8 text-center">
        <Car className="mx-auto h-12 w-12 text-primary mb-4" />
        <h1 className="font-headline text-4xl font-bold text-primary">Driver Partner Registration</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Start earning on your own schedule with Sokko Rides.
        </p>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Driver & Vehicle Information</CardTitle>
            <CardDescription>Please provide accurate information for a quick approval.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label htmlFor="full-name">Full Name</Label>
                <Input id="full-name" required />
                </div>
                <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" required />
                </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="license-number">Driving License Number</Label>
                    <Input id="license-number" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="license-upload">Upload Driving License (Front & Back)</Label>
                    <Input id="license-upload" type="file" multiple required />
                </div>
            </div>

            <div className="border-t pt-6 mt-6">
                 <h3 className="text-lg font-medium mb-4">Vehicle Details</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="vehicle-type">Vehicle Type</Label>
                        <Select required>
                            <SelectTrigger id="vehicle-type">
                                <SelectValue placeholder="Select vehicle type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="car">Car (SokkoGo/SokkoXL)</SelectItem>
                                <SelectItem value="boda">Motorbike (Boda)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="license-plate">License Plate Number</Label>
                        <Input id="license-plate" placeholder="e.g., KDA 123X" required />
                    </div>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                     <div className="space-y-2">
                        <Label htmlFor="vehicle-model">Vehicle Make & Model</Label>
                        <Input id="vehicle-model" placeholder="e.g., Toyota Vitz" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="insurance-upload">Upload Vehicle Insurance Sticker</Label>
                        <Input id="insurance-upload" type="file" required />
                    </div>
                 </div>
            </div>
            
            <div className="flex justify-end gap-2">
                <Button variant="outline" type="button" onClick={() => router.back()} disabled={isSubmitting}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                  Submit for Verification
                </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
