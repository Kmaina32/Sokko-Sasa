
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Ticket, BarChart2 } from "lucide-react";

export default function TicketSalesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold">Ticket Sales</h1>
        <p className="text-muted-foreground">Monitor your ticket sales and revenue.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sales Analytics</CardTitle>
          <CardDescription>
            Track sales per event, ticket type, and more.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-12 border-2 border-dashed rounded-lg">
            <BarChart2 className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-xl font-semibold">No Sales Data Available</h3>
            <p className="mt-2 text-muted-foreground">
              Once your events go live and tickets are sold, data will appear here.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
