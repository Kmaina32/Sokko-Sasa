
'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Heart, Car, Home, Plane, Loader2 } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getInsurances } from '@/lib/firestore';
import type { InsuranceProvider } from '@/lib/types';

const iconMap: { [key: string]: React.ElementType } = {
  Heart,
  Car,
  Home,
  Plane,
};

function GetQuoteDialog({ insuranceType, insuranceProviders }: { insuranceType: string, insuranceProviders: InsuranceProvider[] }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Request Received!",
        description: "We've received your quote request and will contact you shortly.",
      });
      document.getElementById(`close-dialog-${insuranceType.replace(/\s/g, "")}`)?.click();
    }, 1500);
  };
  
  return (
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Get a Quote</DialogTitle>
          <DialogDescription>
            Fill in your details to get a personalized quote for {insuranceType}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="insurance-type" className="text-right">
                Insurance
              </Label>
               <Select defaultValue={insuranceType}>
                <SelectTrigger id="insurance-type" className="col-span-3">
                  <SelectValue placeholder="Select insurance type" />
                </SelectTrigger>
                <SelectContent>
                  {insuranceProviders.map(it => (
                    <SelectItem key={it.name} value={it.name}>{it.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" placeholder="John Doe" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" type="email" placeholder="john@example.com" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
                <Button id={`close-dialog-${insuranceType.replace(/\s/g, "")}`} type="button" variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Request Quote
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
  )
}


export default function InsurancePage() {
    const [insuranceProviders, setInsuranceProviders] = useState<InsuranceProvider[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInsurances = async () => {
            const data = await getInsurances();
            setInsuranceProviders(data);
            setLoading(false);
        }
        fetchInsurances();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="bg-muted/20">
            <div className="container mx-auto px-4 py-12">
                 <div className="text-center mb-12">
                    <Shield className="mx-auto h-16 w-16 text-primary mb-4"/>
                    <h1 className="font-headline text-4xl font-bold">Sokko Insurance</h1>
                    <p className="mt-2 text-lg text-muted-foreground">Smart insurance solutions for modern life.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {insuranceProviders.map(insurance => {
                        const Icon = iconMap[insurance.icon] || Shield;
                        return (
                            <Card key={insurance.name} className="text-center group hover:shadow-xl hover:-translate-y-1 transition-all">
                                <CardHeader className="items-center">
                                    <div className="p-4 bg-primary/10 rounded-full mb-4 group-hover:bg-primary transition-colors">
                                        <Icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors"/>
                                    </div>
                                    <CardTitle>{insurance.type}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="font-semibold text-lg">{insurance.name}</p>
                                    <p className="text-muted-foreground mt-2">{insurance.description}</p>
                                </CardContent>
                                <CardFooter>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button className="w-full">Get a Quote</Button>
                                        </DialogTrigger>
                                        <GetQuoteDialog insuranceType={insurance.type} insuranceProviders={insuranceProviders} />
                                    </Dialog>
                                </CardFooter>
                            </Card>
                        )
                    })}
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
                            <Image src="https://picsum.photos/seed/insure-hero/800/600" alt="Family enjoying life" fill objectFit="cover" data-ai-hint="happy family outdoors"/>
                        </div>
                   </div>
                </Card>
            </div>
        </div>
    );
}
