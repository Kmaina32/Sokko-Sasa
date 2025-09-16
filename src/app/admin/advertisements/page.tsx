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
  PlusCircle,
  Megaphone,
} from "lucide-react";
import Image from "next/image";

// MOCK DATA - In a real app, this would come from a database.
const mockAdvertisements = [
    { id: 'ad1', title: 'Summer Sale', imageUrl: 'https://picsum.photos/seed/ad-summer/1200/400', imageHint: 'summer sale', description: 'Get up to 50% off on all summer items!', isActive: true },
    { id: 'ad2', title: 'New Arrivals', imageUrl: 'https://picsum.photos/seed/ad-new/1200/400', imageHint: 'new products', description: 'Check out the latest collection of handcrafted goods.', isActive: true },
    { id: 'ad3', title: 'Holiday Discounts', imageUrl: 'https://picsum.photos/seed/ad-holiday/1200/400', imageHint: 'holiday shopping', description: 'Special discounts for the upcoming holiday season.', isActive: false },
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


export default function ManageAdvertisementsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-4">
            <div>
                <h1 className="font-headline text-4xl font-bold">Manage Advertisements</h1>
                <p className="text-muted-foreground">Control promotions on your homepage.</p>
            </div>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4"/>
                New Advertisement
            </Button>
        </div>

        <Card>
            <CardContent>
              {mockAdvertisements.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockAdvertisements.map((ad) => (
                            <TableRow key={ad.id}>
                                <TableCell>
                                    <Image src={ad.imageUrl} alt={ad.title} width={100} height={50} className="rounded-md object-cover" data-ai-hint={ad.imageHint} />
                                </TableCell>
                                <TableCell className="font-medium">{ad.title}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Switch id={`active-${ad.id}`} checked={ad.isActive} />
                                        <Badge variant={ad.isActive ? "default" : "secondary"}>{ad.isActive ? "Active" : "Inactive"}</Badge>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <CrudActions />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
              ) : (
                <div className="text-center p-12">
                  <Megaphone className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-xl font-semibold">No Advertisements Found</h3>
                  <p className="mt-2 text-muted-foreground">Click "New Advertisement" to create a promotion.</p>
                </div>
              )}
            </CardContent>
        </Card>
    </div>
  );
}
