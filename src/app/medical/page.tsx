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
import { Search, Stethoscope, Pill, Microscope, HeartPulse } from "lucide-react";

const medicalServices = [
    { name: "Consult a Doctor", icon: Stethoscope },
    { name: "Pharmacy", icon: Pill },
    { name: "Lab Tests", icon: Microscope },
    { name: "Wellness Checks", icon: HeartPulse },
];

const mockClinics = [
    { id: "1", name: "Nairobi Hospital", specialty: "General Hospital", imageUrl: "https://picsum.photos/seed/clinic1/600/400", imageHint: "modern hospital exterior" },
    { id: "2", name: "Aga Khan University Hospital", specialty: "Multi-Specialty", imageUrl: "https://picsum.photos/seed/clinic2/600/400", imageHint: "hospital reception area" },
    { id: "3", name: "Karen Hospital", specialty: "Cardiac Care", imageUrl: "https://picsum.photos/seed/clinic3/600/400", imageHint: "hospital building" },
    { id: "4", name: "M.P. Shah Hospital", specialty: "General & Maternity", imageUrl: "https://picsum.photos/seed/clinic4/600/400", imageHint: "hospital corridor" },
]

export default function MedicalPage() {
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
                        <Card key={service.name} className="flex flex-col items-center justify-center p-6 text-center hover:bg-muted/50 cursor-pointer hover:shadow-lg transition-all">
                            <service.icon className="w-10 h-10 text-primary mb-3"/>
                            <h3 className="font-semibold text-center">{service.name}</h3>
                        </Card>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold tracking-tight mb-4">Featured Hospitals & Clinics</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {mockClinics.map((clinic) => (
                        <Card key={clinic.id} className="group overflow-hidden">
                            <CardHeader className="p-0">
                                <Image src={clinic.imageUrl} alt={clinic.name} width={600} height={400} data-ai-hint={clinic.imageHint} className="aspect-video object-cover"/>
                            </CardHeader>
                            <CardContent className="p-4">
                                <CardTitle className="text-lg group-hover:text-primary">{clinic.name}</CardTitle>
                                <CardDescription>{clinic.specialty}</CardDescription>
                                <Button className="w-full mt-4">Book Appointment</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
