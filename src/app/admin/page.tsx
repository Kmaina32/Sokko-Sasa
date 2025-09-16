import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart2 } from "lucide-react";


export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <h1 className="font-headline text-4xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome! Manage your marketplace with ease.</p>
      </div>

       <Card>
        <CardHeader>
          <CardTitle>Welcome to the Admin Dashboard</CardTitle>
          <CardDescription>
            Select a category from the sidebar to manage different aspects of your application.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-16">
            <div className="text-center text-muted-foreground">
                <BarChart2 className="mx-auto h-24 w-24 mb-4"/>
                <p>Analytics and reports will be displayed here in the future.</p>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
