
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, MapPin, Ticket, Minus, Plus, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { getEventById } from '@/lib/firestore';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
  }).format(amount);
};

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchEvent = async () => {
          const eventData = await getEventById(params.id);
          setEvent(eventData);
          setLoading(false);
      }
      fetchEvent();
  }, [params.id]);
  
  const [ticketQuantities, setTicketQuantities] = useState<{[key: string]: number}>({});

  useEffect(() => {
    if (event?.tickets) {
        setTicketQuantities(event.tickets.reduce((acc: any, ticket: any) => ({ ...acc, [ticket.id]: 0 }), {}));
    }
  }, [event]);
  
  const handleQuantityChange = (ticketId: string, delta: number) => {
    setTicketQuantities(prev => ({
        ...prev,
        [ticketId]: Math.max(0, (prev[ticketId] || 0) + delta)
    }));
  }
  
  const total = event?.tickets.reduce((acc: number, ticket: any) => {
    return acc + ticket.price * (ticketQuantities[ticket.id] || 0);
  }, 0) || 0;

  if(loading) {
    return (
        <div className="flex justify-center items-center h-screen">
            <Loader2 className="h-8 w-8 animate-spin text-primary"/>
        </div>
    )
  }

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

        <div className="container mx-auto -mt-32 relative px-4 py-8">
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
