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
  Trash2,
  FilePenLine,
} from "lucide-react";
import Image from "next/image";

// Mock Data to showcase the UI
const mockAdvertisements = [
    { id: 'ad1', title: 'Summer Sale', imageUrl: 'https://picsum.photos/seed/ad1/100/50', imageHint: 'summer sale' },
];

const mockUsers = [
    { id: 'user1', name: 'John Doe', email: 'john@example.com', type: 'Client', status: 'Active', avatar: 'https://picsum.photos/seed/user1/40/40' },
    { id: 'user2', name: 'Jane Smith', email: 'jane@example.com', type: 'Vendor', status: 'Suspended', avatar: 'https://picsum.photos/seed/user2/40/40' },
];

const mockProducts = [
    { id: 'prod1', name: 'Leather Sofa', seller: 'Jane Smith', price: 50000 },
];

const mockRestaurants = [
    { id: 'resto1', name: "Mama's Kitchen", location: 'Nairobi', cuisine: 'Kenyan' },
];

const mockEvents = [
    { id: 'evt1', name: 'Tech Conference', location: 'KICC, Nairobi', date: '2024-10-26' },
];

const mockRealEstate = [
    { id: 're1', title: '2BR Apartment, Kilimani', type: 'Rent', price: 80000 },
];

const mockJobs = [
    { id: 'job1', title: 'Software Engineer', company: 'Sokko Inc.', type: 'Full-time' },
];

const mockServices = [
    { id: 'srv1', name: 'Quick Plumbers', category: 'Plumbing', rating: 4.8 },
];

const mockDrivers = [
    { id: 'drv1', name: 'Peter Kamau', vehicle: 'Toyota Vitz - KDA 123X', rating: 4.9 },
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

      <AdminSection id="advertisements" title="Manage Advertisements" description="Control the promotional content displayed on the homepage slideshow.">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Kill Switch</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAdvertisements.map(ad => (
              <TableRow key={ad.id}>
                <TableCell>
                  <Image src={ad.imageUrl} alt={ad.title} width={100} height={50} className="rounded-md object-cover" data-ai-hint={ad.imageHint} />
                </TableCell>
                <TableCell className="font-medium">{ad.title}</TableCell>
                <TableCell><Switch defaultChecked={true} /></TableCell>
                <TableCell className="text-right"><CrudActions /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </AdminSection>

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
            {mockUsers.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image src={user.avatar} alt={user.name} width={40} height={40} className="rounded-full" />
                    <span className="font-medium">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.type}</TableCell>
                <TableCell>
                  <Badge variant={user.status === 'Active' ? 'default' : 'destructive'}>{user.status}</Badge>
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
            {mockProducts.map(product => (
                <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.seller}</TableCell>
                    <TableCell>{product.price.toLocaleString()}</TableCell>
                    <TableCell><Switch defaultChecked={true}/></TableCell>
                    <TableCell className="text-right"><CrudActions/></TableCell>
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
            {mockRestaurants.map(resto => (
                <TableRow key={resto.id}>
                    <TableCell className="font-medium">{resto.name}</TableCell>
                    <TableCell>{resto.location}</TableCell>
                    <TableCell>{resto.cuisine}</TableCell>
                    <TableCell><Switch defaultChecked={true}/></TableCell>
                    <TableCell className="text-right"><CrudActions/></TableCell>
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
            {mockEvents.map(event => (
                <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.name}</TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell>{event.date}</TableCell>
                    <TableCell><Switch defaultChecked={true}/></TableCell>
                    <TableCell className="text-right"><CrudActions/></TableCell>
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
            {mockRealEstate.map(prop => (
                <TableRow key={prop.id}>
                    <TableCell className="font-medium">{prop.title}</TableCell>
                    <TableCell>{prop.type}</TableCell>
                    <TableCell>{prop.price.toLocaleString()}</TableCell>
                    <TableCell><Switch defaultChecked={true}/></TableCell>
                    <TableCell className="text-right"><CrudActions/></TableCell>
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
            {mockJobs.map(job => (
                <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell>{job.company}</TableCell>
                    <TableCell>{job.type}</TableCell>
                    <TableCell><Switch defaultChecked={true}/></TableCell>
                    <TableCell className="text-right"><CrudActions/></TableCell>
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
            {mockServices.map(service => (
                <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell>{service.category}</TableCell>
                    <TableCell>{service.rating} ★</TableCell>
                    <TableCell><Switch defaultChecked={true}/></TableCell>
                    <TableCell className="text-right"><CrudActions/></TableCell>
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
            {mockDrivers.map(driver => (
                <TableRow key={driver.id}>
                    <TableCell className="font-medium">{driver.name}</TableCell>
                    <TableCell>{driver.vehicle}</TableCell>
                    <TableCell>{driver.rating} ★</TableCell>
                    <TableCell><Switch defaultChecked={true}/></TableCell>
                    <TableCell className="text-right"><CrudActions/></TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </AdminSection>
    </div>
  );
}
