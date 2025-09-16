'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, MapPin, Ticket, Minus, Plus, ArrowLeft } from 'lucide-react';
import { placeholderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

const mockEventsData: any = {
  evt1: {
    id: 'evt1',
    name: 'Sauti Sol Live in Nairobi',
    location: 'KICC, Nairobi',
    date: '2024-10-26',
    time: '7:00 PM - 11:00 PM',
    description: "Join us for an unforgettable night of music with the legendary Sauti Sol. Get ready to dance to their greatest hits and new tracks from their latest album. This is a concert you don't want to miss!",
    imageUrl: placeholderImages.event1.imageUrl,
    imageHint: placeholderImages.event1.imageHint,
    tickets: [
      { id: 't1', type: 'Regular', price: 2500 },
      { id: 't2', type: 'VIP', price: 6000 },
    ],
  },
  evt2: {
    id: 'evt2',
    name: 'Kenya Tech Summit',
    location: 'Sarit Centre Expo, Nairobi',
    date: '2024-11-15',
    time: '9:00 AM - 5:00 PM',
    description: "The premier technology event in Kenya, bringing together innovators, entrepreneurs, and investors. Featuring keynote speakers, panel discussions, and networking opportunities.",
    imageUrl: placeholderImages.event2.imageUrl,
    imageHint: placeholderImages.event2.imageHint,
    tickets: [
      { id: 't3', type: 'Student Pass', price: 1000 },
      { id: 't4', type: 'Standard Pass', price: 3500 },
      { id: 't5', type: 'Exhibitor Pass', price: 15000 },
    ],
  },
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
  }).format(amount);
};

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const event = mockEventsData[params.id];
  const [ticketQuantities, setTicketQuantities] = useState<{[key: string]: number}>(
    event?.tickets.reduce((acc: any, ticket: any) => ({ ...acc, [ticket.id]: 0 }), {}) || {}
  );
  
  const handleQuantityChange = (ticketId: string, delta: number) => {
    setTicketQuantities(prev => ({
        ...prev,
        [ticketId]: Math.max(0, (prev[ticketId] || 0) + delta)
    }));
  }
  
  const total = event?.tickets.reduce((acc: number, ticket: any) => {
    return acc + ticket.price * (ticketQuantities[ticket.id] || 0);
  }, 0) || 0;


  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="text-center p-12">
          <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-xl font-semibold">Event Not Found</h3>
          <p className="mt-2 text-muted-foreground">Sorry, the event you are looking for does not exist.</p>
           <Button asChild className="mt-6">
                <Link href="/events">
                    <ArrowLeft className="mr-2 h-4 w-4"/>
                    Back to Events
                </Link>
            </Button>
        </Card>
      </div>
    );
  }
  
  const eventDate = new Date(event.date);

  return (
    <div>
        <div className="relative h-[450px] w-full">
            <Image
                src={event.imageUrl}
                alt={event.name}
                fill
                className="object-cover"
                data-ai-hint={event.imageHint}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"/>
        </div>

        <div className="container mx-auto -mt-32 relative px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card className="bg-background/90 backdrop-blur-sm p-4 md:p-6">
                        <h1 className="font-headline text-4xl md:text-5xl font-bold">{event.name}</h1>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-lg text-muted-foreground mt-4">
                            <span className="flex items-center gap-2"><Calendar className="w-5 h-5 text-primary"/> {eventDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            <span className="flex items-center gap-2"><MapPin className="w-5 h-5 text-primary"/> {event.location}</span>
                        </div>
                        <Separator className="my-6"/>
                        <h2 className="text-2xl font-bold mb-4">About this Event</h2>
                        <p className="text-foreground/80 whitespace-pre-wrap">{event.description}</p>
                    </Card>
                </div>
                <div className="lg:col-span-1">
                    <Card className="sticky top-24">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Ticket className="text-primary"/>
                                Get Tickets
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           {event.tickets.map((ticket: any) => (
                               <div key={ticket.id} className="p-3 border rounded-lg">
                                   <div className="flex justify-between items-center">
                                       <div>
                                           <p className="font-semibold">{ticket.type}</p>
                                           <p className="text-primary font-bold">{formatCurrency(ticket.price)}</p>
                                       </div>
                                       <div className="flex items-center gap-2 border rounded-md p-1">
                                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleQuantityChange(ticket.id, -1)} disabled={(ticketQuantities[ticket.id] || 0) === 0}>
                                                <Minus className="w-4 h-4"/>
                                            </Button>
                                            <span className="w-8 text-center font-bold">{ticketQuantities[ticket.id] || 0}</span>
                                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleQuantityChange(ticket.id, 1)}>
                                                <Plus className="w-4 h-4"/>
                                            </Button>
                                        </div>
                                   </div>
                               </div>
                           ))}
                           <Separator />
                            <div className="flex justify-between font-bold text-xl">
                                <span>Total</span>
                                <span>{formatCurrency(total)}</span>
                            </div>
                        </CardContent>
                        <div className="p-6 pt-0">
                           <Button size="lg" className="w-full font-bold" disabled={total === 0}>
                                Buy Tickets
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    </div>
  );
}
