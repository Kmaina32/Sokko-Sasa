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

// Mock Data Removed

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
            {/* Mock data removed. Add data fetching and mapping here. */}
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
            {/* Mock data removed. Add data fetching and mapping here. */}
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
            {/* Mock data removed. Add data fetching and mapping here. */}
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
            {/* Mock data removed. Add data fetching and mapping here. */}
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
            {/* Mock data removed. Add data fetching and mapping here. */}
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
            {/* Mock data removed. Add data fetching and mapping here. */}
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
            {/* Mock data removed. Add data fetching and mapping here. */}
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
            {/* Mock data removed. Add data fetching and mapping here. */}
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
            {/* Mock data removed. Add data fetching and mapping here. */}
          </TableBody>
        </Table>
      </AdminSection>
    </div>
  );
}