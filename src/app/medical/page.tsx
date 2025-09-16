
'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Stethoscope, Pill, Microscope, HeartPulse, Hospital, Loader2 } from "lucide-react";
import Link from 'next/link';
import { getClinics } from '@/lib/firestore';


const medicalServices = [
    { name: "Consult a Doctor", icon: Stethoscope },
    { name: "Pharmacy", icon: Pill },
    { name: "Lab Tests", icon: Microscope },
    { name: "Wellness Checks", icon: HeartPulse },
];

export default function MedicalPage() {
    const [clinics, setClinics] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClinics = async () => {
            const data = await getClinics();
            setClinics(data);
            setLoading(false);
        }
        fetchClinics();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h1 className="font-headline text-4xl font-bold">Sokko Health</h1>
                <p className="mt-2 text-lg text-muted-foreground">Your partner in health and wellness.</p>
            </div>
            
            <div className="mb-8 max-w-2xl mx-auto">
                <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search for doctors, clinics, services..." className="pl-12 text-base h-12 rounded-full shadow-sm" />
                </div>
            </div>

            <div className="mb-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {medicalServices.map((service) => (
                        <Card key={service.name} className="flex flex-col items-center justify-center p-6 text-center bg-muted/40 hover:bg-muted/80 cursor-pointer transition-colors duration-200">
                            <service.icon className="w-10 h-10 text-primary mb-3"/>
                            <h3 className="font-semibold text-center text-foreground/90">{service.name}</h3>
                        </Card>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold tracking-tight mb-4">Featured Hospitals & Clinics</h2>
                {loading ? (
                    <div className="flex justify-center items-center p-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : clinics.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {clinics.map((clinic) => (
                        <Link href={`/medical/${clinic.id}`} key={clinic.id}>
                          <Card className="group overflow-hidden h-full">
                              <CardHeader className="p-0">
                                  <Image src={clinic.imageUrl} alt={clinic.name} width={600} height={400} data-ai-hint={clinic.imageHint} className="aspect-video object-cover"/>
                              </CardHeader>
                              <CardContent className="p-4">
                                  <CardTitle className="text-lg group-hover:text-primary">{clinic.name}</CardTitle>
                                  <CardDescription>{clinic.specialty}</CardDescription>
                                  <Button className="w-full mt-4">Book Appointment</Button>
                              </CardContent>
                          </Card>
                        </Link>
                      ))}
                  </div>
                ) : (
                  <Card className="text-center p-12">
                    <Hospital className="mx-auto h-12 w-12 text-muted-foreground"/>
                    <h3 className="mt-4 text-xl font-semibold">No Hospitals or Clinics Found</h3>
                    <p className="mt-2 text-muted-foreground">We couldn't find any healthcare providers. Please try a different search or check back later.</p>
                  </Card>
                )}
            </div>
        </div>
    );
}
