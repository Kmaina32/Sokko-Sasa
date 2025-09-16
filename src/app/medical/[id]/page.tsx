
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, Hospital, Loader2, MapPin, Phone, Stethoscope, User, Video, MessageSquare } from 'lucide-react';
import { getClinicById } from '@/lib/firestore';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';

function AppointmentDialog({ clinicName, doctors }: { clinicName: string, doctors: any[] }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Appointment Requested!",
        description: `Your request has been sent to ${clinicName}. They will contact you shortly to confirm.`,
      });
      document.getElementById(`close-dialog-${clinicName.replace(/\s/g, "")}`)?.click();
    }, 1500);
  };
  
  return (
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book an Appointment</DialogTitle>
          <DialogDescription>
            Fill in your details to request an appointment at {clinicName}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" required />
            </div>
             <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="0712 345 678" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="doctor">Preferred Doctor (Optional)</Label>
               <Select>
                <SelectTrigger id="doctor">
                  <SelectValue placeholder="Select a doctor" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map(doc => (
                    <SelectItem key={doc.id} value={doc.name}>{doc.name} - {doc.specialty}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Preferred Date</Label>
              <Input id="date" type="date" required />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
                <Button id={`close-dialog-${clinicName.replace(/\s/g, "")}`} type="button" variant="secondary">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Request Appointment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
  )
}

export default function ClinicDetailPage({ params }: { params: { id: string } }) {
  const [clinic, setClinic] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClinic = async () => {
      const data = await getClinicById(params.id);
      setClinic(data);
      setLoading(false);
    };
    fetchClinic();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!clinic) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="p-12 text-center">
          <Hospital className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-xl font-semibold">Clinic Not Found</h3>
          <p className="mt-2 text-muted-foreground">
            The requested health provider could not be found.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-muted/20">
      <div className="relative h-64 w-full">
        <Image
          src={clinic.imageUrl}
          alt={clinic.name}
          fill
          className="object-cover"
          data-ai-hint={clinic.imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
      </div>
      <div className="container mx-auto -mt-24 px-4 pb-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="bg-background/95 p-6 backdrop-blur-sm">
                <h1 className="font-headline text-4xl font-bold">{clinic.name}</h1>
                <p className="mt-2 text-lg text-muted-foreground">{clinic.specialty}</p>
                <div className="mt-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">{clinic.location}</span>
                </div>
                <Separator className="my-6" />
                <div>
                    <h2 className="text-2xl font-bold">About {clinic.name}</h2>
                    <p className="mt-4 whitespace-pre-wrap text-foreground/80">{clinic.description}</p>
                </div>
            </Card>
             <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Doctors</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {clinic.doctors.map((doctor: any) => (
                        <div key={doctor.id} className="flex items-center gap-4 rounded-lg border p-4">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src={doctor.avatarUrl} alt={doctor.name}/>
                                <AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-bold">{doctor.name}</p>
                                <p className="text-sm text-primary">{doctor.specialty}</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Book an Appointment</CardTitle>
                <CardDescription>Request a consultation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="w-full" size="lg"><User className="mr-2"/> In-Person Visit</Button>
                    </DialogTrigger>
                    <AppointmentDialog clinicName={clinic.name} doctors={clinic.doctors} />
                </Dialog>
                 <Button className="w-full" variant="outline" size="lg"><Video className="mr-2"/> Video Consultation</Button>
                <Separator />
                 <Button className="w-full" variant="secondary"><Phone className="mr-2"/> Call Clinic</Button>
                 <Button asChild className="w-full" variant="secondary">
                   <Link href="/messages">
                     <MessageSquare className="mr-2"/> Message Clinic
                   </Link>
                 </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
