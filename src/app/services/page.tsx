import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Wrench, Tv, Hammer, Droplets, Car } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getServices } from "@/lib/firestore";

const serviceCategories = [
  { name: "Plumbing", icon: Droplets, hint: "plumbing tools" },
  { name: "Appliance Repair", icon: Tv, hint: "home appliances" },
  { name: "Mechanics", icon: Car, hint: "car engine" },
  { name: "Handyman", icon: Hammer, hint: "toolbox" },
];


export default async function ServicesPage() {
  const providers = await getServices();

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
        {providers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {providers.map((provider) => (
                  <Card key={provider.id} className="text-center">
                      <CardContent className="p-6">
                          <Image src={provider.imageUrl} alt={provider.name} width={100} height={100} data-ai-hint={provider.imageHint} className="rounded-full mx-auto mb-4 border-4 border-muted"/>
                          <CardTitle className="text-lg">{provider.name}</CardTitle>
                          <CardDescription>{provider.service}</CardDescription>
                          <p className="font-bold text-accent mt-2">{provider.rating} ★</p>
                          <Button asChild className="mt-4 w-full">
                            <Link href={`/services/${provider.id}`}>View Profile</Link>
                          </Button>
                      </CardContent>
                  </Card>
              ))}
          </div>
        ) : (
          <Card className="text-center p-12">
            <Wrench className="mx-auto h-12 w-12 text-muted-foreground"/>
            <h3 className="mt-4 text-xl font-semibold">No Service Providers Found</h3>
            <p className="mt-2 text-muted-foreground">Try a different search to find professionals in your area.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
