
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Building } from "lucide-react";

export default function MyListingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-headline text-4xl font-bold">My Property Listings</h1>
          <p className="text-muted-foreground">Manage your properties for sale or rent.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Property
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center p-12 border-2 border-dashed rounded-lg">
            <Building className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-xl font-semibold">No Properties Listed</h3>
            <p className="mt-2 text-muted-foreground">
              Click "Add New Property" to create your first listing.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
