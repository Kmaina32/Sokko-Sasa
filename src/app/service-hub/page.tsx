import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Utensils,
  Calendar,
  Car,
  Wrench,
  Building,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const providerTypes = [
  {
    name: "Restaurant Owner",
    description: "Join our food delivery network and reach more hungry customers.",
    icon: Utensils,
    href: "/register/restaurant",
  },
  {
    name: "Event Manager",
    description: "List your events, sell tickets, and manage your audience with ease.",
    icon: Calendar,
    href: "/register/event-manager",
  },
  {
    name: "Driver Partner",
    description: "Become a driver for our ride-hailing service and start earning.",
    icon: Car,
    href: "/register/driver",
  },
  {
    name: "Service Professional",
    description: "Offer your skills, from plumbing to tutoring, to a wide audience.",
    icon: Wrench,
    href: "/register/service-provider",
  },
  {
    name: "Real Estate Agent",
    description: "List properties for sale or rent and connect with potential clients.",
    icon: Building,
    href: "/register/real-estate",
  },
  {
    name: "Job Lister / Recruiter",
    description: "Post job openings and find the perfect candidates for your team.",
    icon: Briefcase,
    href: "/register/job-lister",
  },
];

export default function ServiceHubPage() {
  return (
    <div className="bg-muted/20">
        <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className="font-headline text-4xl font-bold">Become a Sokko Sasa Partner</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Choose your business type and join our growing ecosystem of providers.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {providerTypes.map((provider) => (
                    <Card key={provider.name} className="flex flex-col group hover:shadow-xl hover:-translate-y-1 transition-all">
                        <CardHeader className="flex-row items-start gap-4">
                            <div className="p-3 bg-primary/10 rounded-full">
                                <provider.icon className="w-8 h-8 text-primary"/>
                            </div>
                            <div className="flex-1">
                                <CardTitle>{provider.name}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <p className="text-muted-foreground">{provider.description}</p>
                        </CardContent>
                        <div className="p-6 pt-0">
                            <Button asChild className="w-full">
                                <Link href={provider.href}>
                                    Get Started <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"/>
                                </Link>
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    </div>
  );
}
