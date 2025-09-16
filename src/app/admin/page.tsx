import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, XCircle, MoreVertical, User, List } from "lucide-react";

const mockListings = [
    { id: 'L001', title: 'Hand-carved Wooden Elephant', seller: 'John Doe', status: 'Pending', category: 'Product' },
    { id: 'L002', title: 'Graphic Design Services', seller: 'Jane Smith', status: 'Approved', category: 'Service' },
    { id: 'L003', title: '2-Bedroom Apartment in Kilimani', seller: 'Realty Group', status: 'Rejected', category: 'Property' },
    { id: 'L004', title: 'Sales Executive Position', seller: 'Corporate Inc.', status: 'Approved', category: 'Job' },
];

const mockUsers = [
    { id: 'U001', name: 'John Doe', email: 'john@example.com', joined: '2023-10-26', status: 'Active' },
    { id: 'U002', name: 'Jane Smith', email: 'jane@example.com', joined: '2023-09-15', status: 'Active' },
    { id: 'U003', name: 'Realty Group', email: 'contact@realty.co.ke', joined: '2023-11-01', status: 'Suspended' },
    { id: 'U004', name: 'Corporate Inc.', email: 'hr@corporate.com', joined: '2023-08-05', status: 'Active' },
];

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your marketplace with ease.</p>
      </div>
      <Tabs defaultValue="listings">
        <TabsList className="mb-4">
          <TabsTrigger value="listings"><List className="mr-2 h-4 w-4" /> Manage Listings</TabsTrigger>
          <TabsTrigger value="users"><User className="mr-2 h-4 w-4" /> Manage Users</TabsTrigger>
        </TabsList>
        <TabsContent value="listings">
          <Card>
            <CardHeader>
              <CardTitle>Approve Listings</CardTitle>
              <CardDescription>
                Review and manage all submitted listings.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Seller</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockListings.map((listing) => (
                    <TableRow key={listing.id}>
                      <TableCell className="font-medium">{listing.title}</TableCell>
                      <TableCell>{listing.seller}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{listing.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            listing.status === "Approved"
                              ? "default"
                              : listing.status === "Pending"
                              ? "outline"
                              : "destructive"
                          }
                          className={listing.status === 'Approved' ? 'bg-green-500/20 text-green-700 border-green-500/30' : ''}
                        >
                          {listing.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {listing.status === 'Pending' && (
                            <div className="flex gap-2 justify-end">
                                <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-600 hover:bg-green-100">
                                    <CheckCircle className="h-4 w-4"/>
                                </Button>
                                <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-600 hover:bg-red-100">
                                    <XCircle className="h-4 w-4"/>
                                </Button>
                            </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Manage Users</CardTitle>
              <CardDescription>View and manage all registered users.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Joined Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.joined}</TableCell>
                      <TableCell>
                        <Badge
                          variant={user.status === 'Active' ? 'default' : 'destructive'}
                          className={user.status === 'Active' ? 'bg-green-500/20 text-green-700 border-green-500/30' : ''}
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                         <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4"/>
                         </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
