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
} from "lucide-react";

const mockServices = [
    { id: 'srv1', name: 'Quick Plumbers', category: 'Plumbing', rating: 4.8 },
    { id: 'srv2', name: 'FixIt Appliance Repair', category: 'Appliance Repair', rating: 4.9 },
    { id: 'srv3', 'name': 'AutoCare Mechanics', category: 'Mechanic', rating: 4.7 }
];

const CrudActions = () => (
    <div className="flex gap-2 justify-end">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <FilePenLine className="h-4 w-4"/>
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
            <Trash2 className="h-4 w-4"/>
        </Button>
    </div>
);


export default function ManageServicesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
            <h1 className="font-headline text-4xl font-bold">Manage Services</h1>
            <p className="text-muted-foreground">Oversee all service providers.</p>
        </div>
        <Card>
            <CardContent>
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
                        {mockServices.map((service) => (
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
            </CardContent>
        </Card>
    </div>
  );
}
