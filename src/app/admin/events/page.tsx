
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
} from "lucide-react";
import Link from "next/link";

const mockEvents: any[] = [];

const CrudActions = () => (
    <div className="flex gap-2 justify-end">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" disabled>
            <FilePenLine className="h-4 w-4"/>
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" disabled>
            <Trash2 className="h-4 w-4"/>
        </Button>
    </div>
);


export default function ManageEventsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-4">
            <div>
                <h1 className="font-headline text-4xl font-bold">Manage Events</h1>
                <p className="text-muted-foreground">Control all event listings.</p>
            </div>
            <Button asChild disabled>
                <Link href="#">
                    <PlusCircle className="mr-2 h-4 w-4"/>
                    New Event
                </Link>
            </Button>
        </div>
        <Card>
            <CardContent className="p-0">
                {mockEvents.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Event Name</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Organizer</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockEvents.map((event) => (
                                <TableRow key={event.id}>
                                    <TableCell className="font-medium">{event.name}</TableCell>
                                    <TableCell>{event.location}</TableCell>
                                    <TableCell>{event.date}</TableCell>
                                    <TableCell>{event.organizer}</TableCell>
                                    <TableCell>
                                        <CrudActions />
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
                        <Button asChild className="mt-4" disabled>
                            <Link href="#">
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
