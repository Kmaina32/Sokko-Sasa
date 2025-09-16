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
} from "lucide-react";

const mockRestaurants = [
    { id: 'resto1', name: "Mama's Kitchen", location: 'Nairobi', cuisine: 'Kenyan', status: 'Approved' },
    { id: 'resto2', name: "Pizza Inn", location: 'Mombasa', cuisine: 'Pizza', status: 'Pending' },
    { id: 'resto3', name: "Shanghai Kitchen", location: 'Nairobi', cuisine: 'Chinese', status: 'Approved' },
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


export default function ManageFoodDeliveryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
            <h1 className="font-headline text-4xl font-bold">Manage Food Delivery</h1>
            <p className="text-muted-foreground">Administer restaurant partners.</p>
        </div>
        <Card>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Restaurant Name</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Cuisine</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockRestaurants.map((resto) => (
                            <TableRow key={resto.id}>
                                <TableCell className="font-medium">{resto.name}</TableCell>
                                <TableCell>{resto.location}</TableCell>
                                <TableCell>{resto.cuisine}</TableCell>
                                <TableCell>
                                    <Badge variant={resto.status === 'Approved' ? 'default' : 'secondary'}>{resto.status}</Badge>
                                </TableCell>
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
