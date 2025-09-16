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
import { Switch } from "@/components/ui/switch";
import {
  Package,
  Utensils,
  Calendar,
  Building,
  Briefcase,
  Wrench,
  Car,
  User,
  Trash2,
  FilePenLine,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock Data
const mockUsers = [
  { id: 'U001', name: 'John Doe', email: 'john@example.com', type: 'Client', status: 'Active', avatar: 'https://picsum.photos/seed/user1/100/100' },
  { id: 'U002', name: 'Jane Smith', email: 'jane@example.com', type: 'Client', status: 'Active', avatar: 'https://picsum.photos/seed/user2/100/100' },
  { id: 'U003', name: 'Kamau Plumbers', email: 'contact@kamau.co.ke', type: 'Vendor', status: 'Suspended', avatar: 'https://picsum.photos/seed/provider1/100/100' },
  { id: 'U004', name: 'Peter Kariuki', email: 'pete@drivers.com', type: 'Driver', status: 'Active', avatar: 'https://picsum.photos/seed/driver1/100/100' },
];

const mockProducts = [
    { id: 'P001', name: 'Wooden Elephant', seller: 'Artisans Collective', price: 3500, active: true },
    { id: 'P002', name: 'Sisal Kiondo Basket', seller: 'Mombasa Weavers', price: 1200, active: true },
    { id: 'P003', name: 'Leather Jacket', seller: 'Nakuru Leathers', price: 4500, active: false },
];

const mockRestaurants = [
    { id: 'R001', name: 'Java House', location: 'Nairobi', cuisine: 'Cafe', active: true },
    { id: 'R002', name: 'Artcaffe', location: 'Nairobi', cuisine: 'Bakery', active: true },
    { id: 'R003', name: 'Mama Oliech', location: 'Nairobi', cuisine: 'Fish', active: false },
];

const mockEvents = [
    { id: 'E001', name: 'Safaricom Jazz Festival', location: 'Nairobi', date: '2025-02-23', active: true },
    { id: 'E002', name: 'Hakuna Matata Festival', location: 'Naivasha', date: '2025-04-12', active: true },
];

const mockProperties = [
    { id: 'PR001', name: 'Modern Apartment in Kilimani', type: 'Rent', price: '85,000/mo', active: true },
    { id: 'PR002', name: 'Spacious Villa in Karen', type: 'Sale', price: '45,000,000', active: false },
];

const mockJobs = [
    { id: 'J001', title: 'Senior Frontend Developer', company: 'Tech Solutions Ltd.', type: 'Full-time', active: true },
    { id: 'J002', title: 'Marketing Manager', company: 'Creative Agency Inc.', type: 'Full-time', active: true },
];

const mockServices = [
    { id: 'S001', name: 'Kamau Plumbers', category: 'Plumbing', rating: 4.8, active: true },
    { id: 'S002', name: 'FixIt Appliance Masters', category: 'Appliance Repair', rating: 4.7, active: false },
];

const mockDrivers = [
    { id: 'D001', name: 'Peter Kariuki', vehicle: 'Toyota Vitz KDA 123B', rating: 4.9, active: true },
    { id: 'D002', name: 'Aisha Omar', vehicle: 'Suzuki Swift KDB 456C', rating: 4.7, active: true },
];

const AdminSection = ({ id, title, description, children }: { id: string, title: string, description: string, children: React.ReactNode}) => (
    <Card id={id} className="scroll-mt-20">
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
    </Card>
);

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


export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="mb-4">
        <h1 className="font-headline text-4xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your marketplace with ease.</p>
      </div>

      <AdminSection id="users" title="Manage Users" description="Oversee all clients, vendors, and drivers on the platform.">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Kill Switch</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} alt={user.name}/>
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{user.name}</span>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell><Badge variant="secondary">{user.type}</Badge></TableCell>
                <TableCell>
                  <Badge
                    variant={user.status === 'Active' ? 'default' : 'destructive'}
                    className={user.status === 'Active' ? 'bg-green-500/20 text-green-700 border-green-500/30' : ''}
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell><Switch defaultChecked={user.status === 'Active'} /></TableCell>
                <TableCell className="text-right"><CrudActions /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </AdminSection>

      <AdminSection id="products" title="Manage Products" description="Monitor and manage all product listings.">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Seller</TableHead>
              <TableHead>Price (KSh)</TableHead>
              <TableHead>Kill Switch</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockProducts.map((item) => (
              <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.seller}</TableCell>
                  <TableCell>{item.price.toLocaleString()}</TableCell>
                  <TableCell><Switch defaultChecked={item.active} /></TableCell>
                  <TableCell className="text-right"><CrudActions /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </AdminSection>

      <AdminSection id="food" title="Manage Restaurants" description="Add, edit, or disable restaurants in the food delivery section.">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Restaurant Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Cuisine</TableHead>
              <TableHead>Kill Switch</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockRestaurants.map((item) => (
              <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.cuisine}</TableCell>
                  <TableCell><Switch defaultChecked={item.active} /></TableCell>
                  <TableCell className="text-right"><CrudActions /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </AdminSection>
      
      <AdminSection id="events" title="Manage Events" description="Control all event listings on the platform.">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Kill Switch</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockEvents.map((item) => (
              <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell><Switch defaultChecked={item.active} /></TableCell>
                  <TableCell className="text-right"><CrudActions /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </AdminSection>

      <AdminSection id="real_estate" title="Manage Real Estate" description="Oversee property sales and rental listings.">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Price (KSh)</TableHead>
              <TableHead>Kill Switch</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockProperties.map((item) => (
              <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell><Switch defaultChecked={item.active} /></TableCell>
                  <TableCell className="text-right"><CrudActions /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </AdminSection>

      <AdminSection id="jobs" title="Manage Jobs" description="Review and control all job postings.">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Job Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Kill Switch</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockJobs.map((item) => (
              <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{item.company}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell><Switch defaultChecked={item.active} /></TableCell>
                  <TableCell className="text-right"><CrudActions /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </AdminSection>

      <AdminSection id="services" title="Manage Service Providers" description="Control the directory of service professionals.">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Provider Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Kill Switch</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockServices.map((item) => (
              <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.rating} ★</TableCell>
                  <TableCell><Switch defaultChecked={item.active} /></TableCell>
                  <TableCell className="text-right"><CrudActions /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </AdminSection>

      <AdminSection id="rides" title="Manage Drivers" description="Monitor drivers for the ride-hailing service.">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Driver Name</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Kill Switch</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockDrivers.map((item) => (
              <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.vehicle}</TableCell>
                  <TableCell>{item.rating} ★</TableCell>
                  <TableCell><Switch defaultChecked={item.active} /></TableCell>
                  <TableCell className="text-right"><CrudActions /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </AdminSection>
    </div>
  );
}
