
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Trash2,
  FilePenLine,
  Car,
  PlusCircle,
} from "lucide-react";
import Link from "next/link";

const mockDrivers: any[] = [];

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


export default function ManageRidesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-4">
            <div>
                <h1 className="font-headline text-4xl font-bold">Manage Rides</h1>
                <p className="text-muted-foreground">Monitor driver partners and their status.</p>
            </div>
            <Button asChild disabled>
                <Link href="#">
                    <PlusCircle className="mr-2 h-4 w-4"/>
                    New Driver
                </Link>
            </Button>
        </div>
        <Card>
            <CardContent className="p-0">
                {mockDrivers.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Driver Name</TableHead>
                                <TableHead>Vehicle</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockDrivers.map((driver) => (
                                <TableRow key={driver.id}>
                                    <TableCell className="font-medium">{driver.name}</TableCell>
                                    <TableCell>{driver.vehicle}</TableCell>
                                    <TableCell>{driver.rating} ★</TableCell>
                                    <TableCell>
                                        <Badge variant={driver.status === 'Active' ? 'default' : 'secondary'}>{driver.status}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <CrudActions />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="text-center p-12">
                        <Car className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-xl font-semibold">No Drivers Found</h3>
                        <p className="mt-2 text-muted-foreground">Driver partner data will appear here.</p>
                        <Button asChild className="mt-4" disabled>
                            <Link href="#">
                                <PlusCircle className="mr-2 h-4 w-4"/>
                                New Driver
                            </Link>
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
