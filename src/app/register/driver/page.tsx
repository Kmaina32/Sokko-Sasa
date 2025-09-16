import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Car } from "lucide-react";

export default function DriverRegistrationPage() {
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
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                <Label htmlFor="full-name">Full Name</Label>
                <Input id="full-name" />
                </div>
                <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" />
                </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="license-number">Driving License Number</Label>
                    <Input id="license-number" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="license-upload">Upload Driving License (Front & Back)</Label>
                    <Input id="license-upload" type="file" multiple />
                </div>
            </div>

            <div className="border-t pt-6 mt-6">
                 <h3 className="text-lg font-medium mb-4">Vehicle Details</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="vehicle-type">Vehicle Type</Label>
                        <Select>
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
                        <Input id="license-plate" placeholder="e.g., KDA 123X" />
                    </div>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                     <div className="space-y-2">
                        <Label htmlFor="vehicle-model">Vehicle Make & Model</Label>
                        <Input id="vehicle-model" placeholder="e.g., Toyota Vitz" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="insurance-upload">Upload Vehicle Insurance Sticker</Label>
                        <Input id="insurance-upload" type="file" />
                    </div>
                 </div>
            </div>
            
            <div className="flex justify-end">
                <Button type="submit">Submit for Verification</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
