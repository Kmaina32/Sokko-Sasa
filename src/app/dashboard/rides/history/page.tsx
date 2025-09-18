
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { History } from "lucide-react";

export default function RideHistoryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold">Ride History</h1>
        <p className="text-muted-foreground">A log of all your completed trips.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Completed Trips</CardTitle>
          <CardDescription>
            Your past rides and earnings from each will appear here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-12 border-2 border-dashed rounded-lg">
            <History className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-xl font-semibold">No Rides Yet</h3>
            <p className="mt-2 text-muted-foreground">
              Once you start completing trips, they will be logged here.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
