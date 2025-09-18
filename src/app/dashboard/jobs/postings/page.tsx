
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Briefcase } from "lucide-react";

export default function MyPostingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-headline text-4xl font-bold">My Job Postings</h1>
          <p className="text-muted-foreground">Manage your company's job openings.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Post a New Job
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Postings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center p-12 border-2 border-dashed rounded-lg">
            <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-xl font-semibold">No Active Jobs</h3>
            <p className="mt-2 text-muted-foreground">
              Click "Post a New Job" to find your next great hire.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
