
'use client';

import { useState } from 'react';
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
import {
  Search,
  MapPin,
  Briefcase,
  Bookmark,
  Loader2,
  BookmarkCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { placeholderImages } from "@/lib/placeholder-images";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

type Job = {
    id: string;
    title: string;
    company: string;
    type: 'Full-time' | 'Contract';
    location: string;
    logoUrl: string;
    imageHint: string;
};

const mockJobs: Job[] = [
    {
        id: 'job1',
        title: 'Software Engineer',
        company: 'Sokko Inc.',
        type: 'Full-time',
        location: 'Nairobi, Kenya',
        logoUrl: placeholderImages.job1.imageUrl,
        imageHint: placeholderImages.job1.imageHint,
    },
    {
        id: 'job2',
        title: 'Marketing Manager',
        company: 'InnovateKE',
        type: 'Contract',
        location: 'Mombasa, Kenya',
        logoUrl: placeholderImages.job2.imageUrl,
        imageHint: placeholderImages.job2.imageHint,
    },
];

function ApplyJobDialog({ job }: { job: Job }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Application Sent!",
        description: `Your application for the ${job.title} position has been submitted.`,
      });
      // Find and close the dialog
      document.getElementById(`close-dialog-${job.id}`)?.click();
    }, 1500);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Apply Now</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Apply for {job.title}</DialogTitle>
          <DialogDescription>
            Submit your details for the position at {job.company}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" defaultValue="Your Name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" type="email" defaultValue="you@example.com" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="resume" className="text-right">
                Resume
              </Label>
              <Input id="resume" type="file" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
               <Button id={`close-dialog-${job.id}`} type="button" variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Application
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}


export default function JobsPage() {
    const { toast } = useToast();
    const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());

    const handleSaveJob = (jobId: string) => {
        setSavedJobs(prev => {
            const newSavedJobs = new Set(prev);
            if (newSavedJobs.has(jobId)) {
                newSavedJobs.delete(jobId);
                toast({ title: 'Job Unsaved', description: 'This job has been removed from your saved list.' });
            } else {
                newSavedJobs.add(jobId);
                toast({ title: 'Job Saved!', description: 'You can find this job later in your profile.' });
            }
            return newSavedJobs;
        });
    };

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
                {mockJobs.length > 0 ? (
                  mockJobs.map(job => {
                    const isSaved = savedJobs.has(job.id);
                    return (
                      <Card key={job.id} className="transition-all duration-300 ease-in-out hover:shadow-lg hover:border-primary">
                          <CardHeader className="flex flex-row items-start gap-4">
                              <Image src={job.logoUrl} alt={`${job.company} logo`} width={64} height={64} className="w-16 h-16 rounded-md border" data-ai-hint={job.imageHint}/>
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
                          <CardFooter className="justify-end gap-2">
                              <Button variant="outline" onClick={() => handleSaveJob(job.id)}>
                                {isSaved ? (
                                    <BookmarkCheck className="mr-2 h-4 w-4 text-primary" />
                                ) : (
                                    <Bookmark className="mr-2 h-4 w-4" />
                                )}
                                {isSaved ? 'Saved' : 'Save Job'}
                              </Button>
                              <ApplyJobDialog job={job} />
                          </CardFooter>
                      </Card>
                    )
                  })
                ) : (
                  <Card className="text-center p-12">
                    <Briefcase className="mx-auto h-12 w-12 text-muted-foreground"/>
                    <h3 className="mt-4 text-xl font-semibold">No Jobs Found</h3>
                    <p className="mt-2 text-muted-foreground">Try adjusting your search filters or check back later for new job postings.</p>
                  </Card>
                )}
            </div>
        </div>
    );
}
