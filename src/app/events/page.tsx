import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Ticket } from "lucide-react";
import Link from "next/link";
import { mockEvents } from "@/lib/mock-data";


export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold">Upcoming Events</h1>
        <p className="text-muted-foreground">
          Discover what's happening around you.
        </p>
      </div>

      <div className="space-y-6">
        {mockEvents.length > 0 ? (
          mockEvents.map((event) => (
            <Link href={`/events/${event.id}`} key={event.id} className="block group">
              <Card className="grid grid-cols-1 md:grid-cols-3 overflow-hidden transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:border-primary">
                <div className="md:col-span-1 relative">
                    <Image
                        src={event.imageUrl}
                        alt={event.name}
                        fill
                        className="h-full w-full object-cover"
                        data-ai-hint={event.imageHint}
                    />
                </div>
                <div className="md:col-span-2 flex flex-col">
                    <CardHeader>
                        <CardTitle className="text-2xl group-hover:text-primary">{event.name}</CardTitle>
                        <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pt-2">
                            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4"/> {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4"/> {event.location}</span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <p className="text-muted-foreground line-clamp-3">{event.description}</p>
                    </CardContent>
                    <div className="p-6 pt-0">
                        <Button>
                            <Ticket className="mr-2 h-4 w-4"/>
                            View Details
                        </Button>
                    </div>
                </div>
              </Card>
            </Link>
          ))
        ) : (
          <Card className="text-center p-12">
            <Calendar className="mx-auto h-12 w-12 text-muted-foreground"/>
            <h3 className="mt-4 text-xl font-semibold">No Upcoming Events</h3>
            <p className="mt-2 text-muted-foreground">Check back soon for new events in your area.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
