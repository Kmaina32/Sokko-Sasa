import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Heart, Car, Home, Plane } from "lucide-react";
import Image from "next/image";

const insuranceTypes = [
  { name: "Health Insurance", icon: Heart, description: "Comprehensive medical coverage for you and your family.", imageHint: "family smiling" },
  { name: "Motor Insurance", icon: Car, description: "Protect your vehicle against accidents, theft, and damage.", imageHint: "modern car" },
  { name: "Home Insurance", icon: Home, description: "Secure your home and belongings from unforeseen events.", imageHint: "suburban house" },
  { name: "Travel Insurance", icon: Plane, description: "Travel with peace of mind, wherever you go.", imageHint: "airplane window" },
];

export default function InsurancePage() {
    return (
        <div className="bg-muted/20">
            <div className="container mx-auto px-4 py-12">
                 <div className="text-center mb-12">
                    <Shield className="mx-auto h-16 w-16 text-primary mb-4"/>
                    <h1 className="font-headline text-4xl font-bold">Sokko Insurance</h1>
                    <p className="mt-2 text-lg text-muted-foreground">Smart insurance solutions for modern life.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {insuranceTypes.map(insurance => (
                        <Card key={insurance.name} className="text-center group hover:shadow-xl hover:-translate-y-1 transition-all">
                            <CardHeader className="items-center">
                                <div className="p-4 bg-primary/10 rounded-full mb-4 group-hover:bg-primary transition-colors">
                                    <insurance.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors"/>
                                </div>
                                <CardTitle>{insurance.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{insurance.description}</p>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">Get a Quote</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>

                <Card className="mt-12 bg-primary text-primary-foreground overflow-hidden">
                   <div className="grid grid-cols-1 md:grid-cols-2 items-center">
                        <div className="p-8 md:p-12">
                            <h2 className="text-3xl font-bold mb-4">Why Choose Sokko Insurance?</h2>
                            <p className="mb-6 opacity-90">Experience a seamless, transparent, and affordable way to get insured. With instant quotes, easy claims, and 24/7 support, we've got you covered.</p>
                            <ul className="space-y-3 opacity-90">
                                <li className="flex items-center gap-3"><Shield className="w-5 h-5"/> Trusted Underwriters</li>
                                <li className="flex items-center gap-3"><Shield className="w-5 h-5"/> Fast & Easy Claims</li>
                                <li className="flex items-center gap-3"><Shield className="w-5 h-5"/> Affordable Premiums</li>
                            </ul>
                        </div>
                        <div className="relative h-64 md:h-full">
                            <Image src="https://picsum.photos/seed/insure-hero/800/600" alt="Family enjoying life" layout="fill" objectFit="cover" data-ai-hint="happy family outdoors"/>
                        </div>
                   </div>
                </Card>
            </div>
        </div>
    );
}
