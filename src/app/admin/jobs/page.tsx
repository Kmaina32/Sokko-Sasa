import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Trash2,
  FilePenLine,
} from "lucide-react";

const mockJobs = [
    { id: 'job1', title: 'Software Engineer', company: 'Sokko Inc.', type: 'Full-time', status: 'Open' },
    { id: 'job2', title: 'Marketing Manager', company: 'InnovateKE', type: 'Contract', status: 'Closed' },
];

const CrudActions = () => (
    <div className="flex gap-2 justify-end">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <FilePenLine className="h-4 w-4"/>
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
            <Trash2 className="h-4 w-4"/>
        </Button>
    </div>
);


export default function ManageJobsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
            <h1 className="font-headline text-4xl font-bold">Manage Jobs</h1>
            <p className="text-muted-foreground">Control all job postings.</p>
        </div>
        <Card>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Job Title</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockJobs.map((job) => (
                            <TableRow key={job.id}>
                                <TableCell className="font-medium">{job.title}</TableCell>
                                <TableCell>{job.company}</TableCell>
                                <TableCell>{job.type}</TableCell>
                                <TableCell>
                                    <Badge variant={job.status === 'Open' ? 'default' : 'secondary'}>{job.status}</Badge>
                                </TableCell>
                                <TableCell>
                                    <CrudActions />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  );
}
