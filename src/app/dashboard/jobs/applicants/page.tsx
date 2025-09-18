
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { UserCheck } from "lucide-react";

export default function ApplicantsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold">Applicant Tracking</h1>
        <p className="text-muted-foreground">Review and manage candidates for your job postings.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Applicants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center p-12 border-2 border-dashed rounded-lg">
            <UserCheck className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-xl font-semibold">No Applicants Yet</h3>
            <p className="mt-2 text-muted-foreground">
              When candidates apply to your jobs, they will appear here.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
