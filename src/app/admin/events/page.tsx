
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Trash2,
  FilePenLine,
  PlusCircle,
  Calendar as CalendarIcon,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Event } from "@/lib/types";
import { getEvents, deleteEvent } from "@/lib/firestore";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from 'next/image';

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
}

export default function ManageEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchEvents = async () => {
    setLoading(true);
    const eventList = await getEvents();
    setEvents(eventList);
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (eventId: string) => {
    try {
      await deleteEvent(eventId);
      fetchEvents();
      toast({
        title: "Success",
        description: "Event has been deleted.",
      });
    } catch (error) {
       toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete event.",
      });
    }
  };

  const CrudActions = ({ event }: { event: Event }) => (
    <div className="flex gap-2 justify-end">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" asChild>
            <Link href={`/admin/events/edit/${event.id}`}>
              <FilePenLine className="h-4 w-4"/>
            </Link>
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                <Trash2 className="h-4 w-4"/>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the event "{event.name}".
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete(event.id)}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
    </div>
);


  return (
    <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-4">
            <div>
                <h1 className="font-headline text-4xl font-bold">Manage Events</h1>
                <p className="text-muted-foreground">Control all event listings.</p>
            </div>
            <Button asChild>
                <Link href="/admin/events/new">
                    <PlusCircle className="mr-2 h-4 w-4"/>
                    New Event
                </Link>
            </Button>
        </div>
        <Card>
            <CardContent className="p-0">
                {loading ? (
                    <div className="flex justify-center items-center p-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : events.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Event</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {events.map((event) => (
                                <TableRow key={event.id}>
                                    <TableCell className="font-medium flex items-center gap-4">
                                        <Image src={event.imageUrl} alt={event.name} width={60} height={40} className="rounded-md object-cover" />
                                        <span>{event.name}</span>
                                    </TableCell>
                                    <TableCell>{event.location}</TableCell>
                                    <TableCell>{formatDate(event.date)}</TableCell>
                                    <TableCell>
                                        <CrudActions event={event} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="text-center p-12">
                        <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-xl font-semibold">No Events Found</h3>
                        <p className="mt-2 text-muted-foreground">Click "New Event" to create a listing.</p>
                        <Button asChild className="mt-4">
                            <Link href="/admin/events/new">
                                <PlusCircle className="mr-2 h-4 w-4"/>
                                New Event
                            </Link>
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
