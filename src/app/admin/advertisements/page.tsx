
'use client';

import { useState, useEffect } from 'react';
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
import { Switch } from "@/components/ui/switch";
import {
  Trash2,
  FilePenLine,
  PlusCircle,
  Megaphone,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getAdvertisements, updateAdvertisementStatus, deleteAdvertisement } from '@/lib/firestore';
import type { Advertisement } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuth } from '@/context/auth-context';


export default function ManageAdvertisementsPage() {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { loading: authLoading } = useAuth();

  const fetchAdvertisements = async () => {
    setLoading(true);
    const adList = await getAdvertisements();
    setAdvertisements(adList);
    setLoading(false);
  }

  useEffect(() => {
    if (!authLoading) {
      fetchAdvertisements();
    }
  }, [authLoading]);

  const handleStatusChange = async (adId: string, newStatus: boolean) => {
    try {
      await updateAdvertisementStatus(adId, newStatus);
      setAdvertisements(prevAds => 
        prevAds.map(ad => ad.id === adId ? { ...ad, isActive: newStatus } : ad)
      );
      toast({
        title: "Success",
        description: "Advertisement status updated.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update status.",
      });
    }
  }
  
  const handleDelete = async (adId: string) => {
    try {
      await deleteAdvertisement(adId);
      fetchAdvertisements();
      toast({
        title: "Success",
        description: "Advertisement deleted.",
      });
    } catch (error) {
       toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete advertisement.",
      });
    }
  }


  const CrudActions = ({ ad }: { ad: Advertisement}) => (
    <div className="flex gap-2 justify-end">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" disabled>
            <FilePenLine className="h-4 w-4"/>
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                <Trash2 className="h-4 w-4"/>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the ad "{ad.title}".
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete(ad.id)}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
    </div>
  );


  return (
    <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-4">
            <div>
                <h1 className="font-headline text-4xl font-bold">Manage Advertisements</h1>
                <p className="text-muted-foreground">Control promotions on your homepage.</p>
            </div>
            <Button asChild>
                <Link href="/admin/advertisements/new">
                    <PlusCircle className="mr-2 h-4 w-4"/>
                    New Advertisement
                </Link>
            </Button>
        </div>

        <Card>
            <CardContent className="p-0">
              {loading || authLoading ? (
                <div className="flex justify-center items-center p-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : advertisements.length > 0 ? (
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
                        {advertisements.map((ad) => (
                            <TableRow key={ad.id}>
                                <TableCell>
                                    <Image src={ad.imageUrl} alt={ad.title} width={100} height={50} className="rounded-md object-cover" data-ai-hint={ad.imageHint} />
                                </TableCell>
                                <TableCell className="font-medium">{ad.title}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Switch 
                                          id={`active-${ad.id}`} 
                                          checked={ad.isActive} 
                                          onCheckedChange={(checked) => handleStatusChange(ad.id, checked)}
                                        />
                                        <Badge variant={ad.isActive ? "default" : "secondary"}>{ad.isActive ? "Active" : "Inactive"}</Badge>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <CrudActions ad={ad}/>
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
                  <Button asChild className="mt-4">
                    <Link href="/admin/advertisements/new">
                        <PlusCircle className="mr-2 h-4 w-4"/>
                        New Advertisement
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
        </Card>
    </div>
  );
}
