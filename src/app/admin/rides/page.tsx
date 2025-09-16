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

const mockDrivers = [
    { id: 'drv1', name: 'Peter Kamau', vehicle: 'Toyota Vitz - KDA 123X', rating: 4.9, status: 'Active' },
    { id: 'drv2', name: 'Mary Wanjiru', vehicle: 'Boda-Boda - KMCF 456Y', rating: 4.7, status: 'Offline'},
    { id: 'drv3', name: 'David Ochieng', vehicle: 'Suzuki Alto - KDB 789Z', rating: 4.8, status: 'Active' },
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


export default function ManageRidesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
            <h1 className="font-headline text-4xl font-bold">Manage Rides</h1>
            <p className="text-muted-foreground">Monitor driver partners and their status.</p>
        </div>
        <Card>
            <CardContent>
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
            </CardContent>
        </Card>
    </div>
  );
}
