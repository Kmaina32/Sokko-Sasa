
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { DollarSign, BarChart2 } from "lucide-react";

export default function DriverEarningsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold">My Earnings</h1>
        <p className="text-muted-foreground">Track your income and performance.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
            <CardHeader>
                <CardTitle>Today's Earnings</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">KES 0.00</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>This Week</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">KES 0.00</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>This Month</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-3xl font-bold">KES 0.00</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Earnings Breakdown</CardTitle>
          <CardDescription>
            Your earnings history and analytics will be displayed here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-12 border-2 border-dashed rounded-lg">
            <BarChart2 className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-xl font-semibold">No Earnings Data</h3>
            <p className="mt-2 text-muted-foreground">
              As you complete trips, your earnings data will populate here.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
