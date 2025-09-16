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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Trash2,
  FilePenLine,
} from "lucide-react";
import Image from "next/image";

const mockUsers = [
    { id: 'user1', name: 'John Doe', email: 'john@example.com', type: 'Client', status: 'Active', avatar: 'https://picsum.photos/seed/user1/40/40' },
    { id: 'user2', name: 'Jane Smith', email: 'jane@example.com', type: 'Vendor', status: 'Suspended', avatar: 'https://picsum.photos/seed/user2/40/40' },
    { id: 'user3', name: 'Peter Jones', email: 'peter@example.com', type: 'Driver', status: 'Active', avatar: 'https://picsum.photos/seed/user3/40/40' },
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


export default function ManageUsersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
            <h1 className="font-headline text-4xl font-bold">Manage Users</h1>
            <p className="text-muted-foreground">View and manage all user accounts.</p>
        </div>
        <Card>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Image src={user.avatar} alt={user.name} width={40} height={40} className="rounded-full" />
                                        <span className="font-medium">{user.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{user.type}</Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={user.status === 'Active' ? 'default' : 'destructive'}>{user.status}</Badge>
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
