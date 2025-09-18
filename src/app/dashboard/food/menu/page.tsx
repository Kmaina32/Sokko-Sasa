
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function FoodMenuDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
            <h1 className="font-headline text-4xl font-bold">Menu Management</h1>
            <p className="text-muted-foreground">Add, edit, or remove items from your menu.</p>
        </div>
        <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Item
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Menu</CardTitle>
          <CardDescription>
            A list of all items available at your restaurant.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-12 border-2 border-dashed rounded-lg">
            <Utensils className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-xl font-semibold">No Menu Items Yet</h3>
            <p className="mt-2 text-muted-foreground">
              Click "Add New Item" to build your menu.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
