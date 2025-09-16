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

const mockEvents = [
  { id: "1", title: "Safaricom Jazz Festival", date: "2025-02-23", location: "Nairobi, Kenya", imageUrl: "https://picsum.photos/seed/event1/600/400", imageHint: "jazz festival stage" },
  { id: "2", name: "Hakuna Matata Festival", date: "2025-04-12", location: "Naivasha, Kenya", imageUrl: "https://picsum.photos/seed/event2/600/400", imageHint: "outdoor music festival" },
  { id: "3", name: "Kenya International Trade Fair", date: "2025-06-05", location: "KICC, Nairobi", imageUrl: "https://picsum.photos/seed/event3/600/400", imageHint: "convention center interior" },
  { id: "4", name: "Rhino Charge Off-Road Race", date: "2025-05-31", location: "Undisclosed", imageUrl: "https://picsum.photos/seed/event4/600/400", imageHint: "off road vehicle" },
];

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
        {mockEvents.map((event) => (
          <Card key={event.id} className="grid grid-cols-1 md:grid-cols-3 overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg">
            <div className="md:col-span-1">
                <Image
                    src={event.imageUrl}
                    alt={event.title || event.name}
                    width={600}
                    height={400}
                    className="h-full w-full object-cover aspect-video md:aspect-auto"
                    data-ai-hint={event.imageHint}
                />
            </div>
            <div className="md:col-span-2 flex flex-col">
                <CardHeader>
                    <CardTitle className="text-2xl">{event.title || event.name}</CardTitle>
                    <CardDescription className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pt-2">
                        <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4"/> {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4"/> {event.location}</span>
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                    <p className="text-muted-foreground">More details about the event will be displayed here. This could include a short description, schedule, or other relevant information to attract attendees.</p>
                </CardContent>
                <div className="p-6 pt-0">
                    <Button>
                        <Ticket className="mr-2 h-4 w-4"/>
                        Get Tickets
                    </Button>
                </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
