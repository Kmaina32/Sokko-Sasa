import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Wrench, Tv, Hammer, Droplets, Car } from "lucide-react";
import Image from "next/image";

const serviceCategories = [
  { name: "Plumbing", icon: Droplets, hint: "plumbing tools" },
  { name: "Appliance Repair", icon: Tv, hint: "home appliances" },
  { name: "Mechanics", icon: Car, hint: "car engine" },
  { name: "Handyman", icon: Hammer, hint: "toolbox" },
];

const mockProviders = [
    { id: "1", name: "Kamau Plumbers", service: "Plumbing", rating: 4.8, imageUrl: "https://picsum.photos/seed/provider1/100/100", imageHint: "plumber working" },
    { id: "2", name: "FixIt Appliance Masters", service: "Appliance Repair", rating: 4.7, imageUrl: "https://picsum.photos/seed/provider2/100/100", imageHint: "technician repairing washing machine" },
    { id: "3", name: "AutoCare Experts", service: "Mechanics", rating: 4.9, imageUrl: "https://picsum.photos/seed/provider3/100/100", imageHint: "mechanic at work" },
    { id: "4", name: "General Handyman", service: "Handyman", rating: 4.6, imageUrl: "https://picsum.photos/seed/provider4/100/100", imageHint: "man assembling furniture" },
];

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="font-headline text-4xl font-bold">Find Local Services</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Connect with trusted professionals for any job.
        </p>
      </div>

      <div className="mb-8 max-w-2xl mx-auto">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Search for a service (e.g., 'plumber')" className="pl-12 text-base h-12 rounded-full shadow-sm" />
        </div>
      </div>

        <div className="mb-12">
            <h2 className="text-2xl font-bold tracking-tight mb-4">Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {serviceCategories.map((category) => (
                    <Button key={category.name} variant="outline" className="h-24 text-lg flex-col gap-2 shadow-sm hover:shadow-md hover:border-primary">
                        <category.icon className="w-8 h-8"/>
                        {category.name}
                    </Button>
                ))}
            </div>
        </div>


      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Top Rated Providers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockProviders.map((provider) => (
                <Card key={provider.id} className="text-center">
                    <CardContent className="p-6">
                        <Image src={provider.imageUrl} alt={provider.name} width={100} height={100} data-ai-hint={provider.imageHint} className="rounded-full mx-auto mb-4 border-4 border-muted"/>
                        <CardTitle className="text-lg">{provider.name}</CardTitle>
                        <CardDescription>{provider.service}</CardDescription>
                        <p className="font-bold text-accent mt-2">{provider.rating} ★</p>
                        <Button className="mt-4 w-full">View Profile</Button>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
