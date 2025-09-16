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
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <h1 className="font-headline text-4xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your marketplace with ease.</p>
      </div>
    </div>
  );
}
