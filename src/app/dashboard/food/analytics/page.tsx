
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { BarChart2 } from "lucide-react";

export default function FoodAnalyticsDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold">Sales & Performance Analytics</h1>
        <p className="text-muted-foreground">Insights into your restaurant's performance.</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
          <CardDescription>
            Detailed charts on sales, popular items, and customer trends.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-12 border-2 border-dashed rounded-lg">
            <BarChart2 className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-xl font-semibold">No Analytics Data</h3>
            <p className="mt-2 text-muted-foreground">
              As you receive orders, performance data will be generated here.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
