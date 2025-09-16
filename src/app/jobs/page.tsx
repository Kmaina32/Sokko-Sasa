import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockJobs = [
  { id: "1", title: "Senior Frontend Developer", company: "Tech Solutions Ltd.", location: "Nairobi", type: "Full-time", logoUrl: "https://picsum.photos/seed/logo1/100/100" },
  { id: "2", title: "Marketing Manager", company: "Creative Agency Inc.", location: "Mombasa", type: "Full-time", logoUrl: "https://picsum.photos/seed/logo2/100/100" },
  { id: "3", title: "Human Resources Intern", company: "Corporate Group", location: "Nairobi", type: "Internship", logoUrl: "https://picsum.photos/seed/logo3/100/100" },
  { id: "4", title: "Customer Service Representative", company: "Sokko Sasa", location: "Remote", type: "Part-time", logoUrl: "https://picsum.photos/seed/logo4/100/100" },
  { id: "5", title: "Lead Backend Engineer", company: "Fintech Innovators", location: "Nairobi", type: "Full-time", logoUrl: "https://picsum.photos/seed/logo5/100/100" },
];

export default function JobsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h1 className="font-headline text-4xl font-bold">Find Your Dream Job</h1>
                <p className="mt-2 text-lg text-muted-foreground">Explore thousands of job opportunities.</p>
            </div>

            <Card className="mb-8 p-6 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                             <Label htmlFor="job-title">Job Title / Keyword</Label>
                            <div className="relative">
                                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input id="job-title" placeholder="e.g., Software Engineer" className="pl-10"/>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="job-location">Location</Label>
                             <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <Input id="job-location" placeholder="e.g., Nairobi" className="pl-10"/>
                            </div>
                        </div>
                    </div>
                    <div className="self-end">
                         <Button size="lg" className="w-full h-10">
                            <Search className="mr-2 h-4 w-4"/> Search Jobs
                        </Button>
                    </div>
                </div>
            </Card>

            <div className="space-y-4">
                {mockJobs.map(job => (
                    <Card key={job.id} className="transition-all duration-300 ease-in-out hover:shadow-lg hover:border-primary">
                        <CardHeader className="flex flex-row items-start gap-4">
                            <img src={job.logoUrl} alt={`${job.company} logo`} className="w-16 h-16 rounded-md"/>
                            <div className="flex-1">
                                <CardTitle>{job.title}</CardTitle>
                                <CardDescription className="text-base">{job.company}</CardDescription>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                    <MapPin className="w-4 h-4" />
                                    <span>{job.location}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <Badge variant={job.type === 'Full-time' ? 'default' : 'secondary'}>{job.type}</Badge>
                                <p className="text-sm text-muted-foreground mt-2">2d ago</p>
                            </div>
                        </CardHeader>
                        <CardFooter>
                            <Button variant="outline" className="mr-2">Save Job</Button>
                            <Button>Apply Now</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}

// Minimal Label component for use within this page
const Label = (props: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label className="text-sm font-medium text-muted-foreground" {...props} />
);
