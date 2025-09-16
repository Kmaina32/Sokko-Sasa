
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
  Wrench,
  PlusCircle,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const mockServices: any[] = [];

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


export default function ManageServicesPage() {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setServices(mockServices);
        setLoading(false);
    }, [])

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-4">
            <div>
                <h1 className="font-headline text-4xl font-bold">Manage Services</h1>
                <p className="text-muted-foreground">Oversee all service providers.</p>
            </div>
            <Button asChild>
                <Link href="/admin/services/new">
                    <PlusCircle className="mr-2 h-4 w-4"/>
                    New Provider
                </Link>
            </Button>
        </div>
        <Card>
            <CardContent className="p-0">
                {loading ? (
                    <div className="flex justify-center items-center p-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : services.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Provider Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {services.map((service) => (
                                <TableRow key={service.id}>
                                    <TableCell className="font-medium">{service.name}</TableCell>
                                    <TableCell>{service.category}</TableCell>
                                    <TableCell>{service.rating} ★</TableCell>
                                    <TableCell>
                                        <CrudActions />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="text-center p-12">
                        <Wrench className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-xl font-semibold">No Service Providers Found</h3>
                        <p className="mt-2 text-muted-foreground">Click "New Provider" to add one.</p>
                        <Button asChild className="mt-4">
                            <Link href="/admin/services/new">
                                <PlusCircle className="mr-2 h-4 w-4"/>
                                New Provider
                            </Link>
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
