
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
  Building,
  PlusCircle,
} from "lucide-react";
import Link from "next/link";

const mockRealEstate: any[] = [];

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount);
}

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


export default function ManageRealEstatePage() {
  return (
    <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-4">
            <div>
                <h1 className="font-headline text-4xl font-bold">Manage Real Estate</h1>
                <p className="text-muted-foreground">Supervise all property listings.</p>
            </div>
            <Button asChild disabled>
                <Link href="#">
                    <PlusCircle className="mr-2 h-4 w-4"/>
                    New Property
                </Link>
            </Button>
        </div>
        <Card>
            <CardContent className="p-0">
                {mockRealEstate.length > 0 ? (
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
                ) : (
                    <div className="text-center p-12">
                        <Building className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-xl font-semibold">No Properties Found</h3>
                        <p className="mt-2 text-muted-foreground">Click "New Property" to add a listing.</p>
                        <Button asChild className="mt-4" disabled>
                            <Link href="#">
                                <PlusCircle className="mr-2 h-4 w-4"/>
                                New Property
                            </Link>
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
