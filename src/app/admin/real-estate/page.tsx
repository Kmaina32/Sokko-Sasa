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

const mockRealEstate = [
    { id: 're1', title: '2BR Apartment, Kilimani', type: 'Rent', price: 80000, agent: 'Property Masters' },
    { id: 're2', title: '4BR Townhouse, Runda', type: 'Sale', price: 45000000, agent: 'Prime Properties' },
];

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount);
}

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


export default function ManageRealEstatePage() {
  return (
    <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
            <h1 className="font-headline text-4xl font-bold">Manage Real Estate</h1>
            <p className="text-muted-foreground">Supervise all property listings.</p>
        </div>
        <Card>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Agent</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockRealEstate.map((prop) => (
                            <TableRow key={prop.id}>
                                <TableCell className="font-medium">{prop.title}</TableCell>
                                <TableCell>
                                    <Badge variant={prop.type === "Sale" ? "destructive" : "default"}>
                                        {prop.type}
                                    </Badge>
                                </TableCell>
                                <TableCell>{formatCurrency(prop.price)}</TableCell>
                                <TableCell>{prop.agent}</TableCell>
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
