
'use client';

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
  Utensils,
  PlusCircle,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
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
import { useToast } from "@/hooks/use-toast";
import type { Restaurant } from "@/lib/types";
import { deleteRestaurant, getRestaurants } from "@/lib/firestore";
import Image from "next/image";

const CrudActions = ({ restaurant, onDelete }: { restaurant: Restaurant; onDelete: () => void }) => (
    <div className="flex gap-2 justify-end">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" asChild>
            <Link href={`/admin/food/edit/${restaurant.id}`}>
              <FilePenLine className="h-4 w-4"/>
            </Link>
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
                This action cannot be undone. This will permanently delete the restaurant "{restaurant.name}".
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
    </div>
);


export default function ManageFoodDeliveryPage() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    const fetchRestaurants = async () => {
        setLoading(true);
        const restaurantList = await getRestaurants();
        setRestaurants(restaurantList);
        setLoading(false);
    }

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const handleDelete = async (restaurantId: string) => {
      try {
        await deleteRestaurant(restaurantId);
        fetchRestaurants();
        toast({
          title: "Success",
          description: "Restaurant has been deleted.",
        });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete restaurant.",
        });
      }
    }

  return (
    <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-4">
            <div>
                <h1 className="font-headline text-4xl font-bold">Manage Food Delivery</h1>
                <p className="text-muted-foreground">Administer restaurant partners.</p>
            </div>
             <Button asChild>
                <Link href="/admin/food/new">
                    <PlusCircle className="mr-2 h-4 w-4"/>
                    New Restaurant
                </Link>
            </Button>
        </div>
        <Card>
            <CardContent className="p-0">
                {loading ? (
                     <div className="flex justify-center items-center p-12">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : restaurants.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Restaurant Name</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Cuisine</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {restaurants.map((resto) => (
                                <TableRow key={resto.id}>
                                    <TableCell className="font-medium flex items-center gap-4">
                                      <Image src={resto.imageUrl} alt={resto.name} width={40} height={40} className="rounded-md object-cover" />
                                      <span>{resto.name}</span>
                                    </TableCell>
                                    <TableCell>{resto.location}</TableCell>
                                    <TableCell>{resto.cuisine}</TableCell>
                                    <TableCell>
                                        <Badge variant="default">{resto.rating} ★</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <CrudActions restaurant={resto} onDelete={() => handleDelete(resto.id)}/>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                 ) : (
                    <div className="text-center p-12">
                        <Utensils className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-4 text-xl font-semibold">No Restaurants Found</h3>
                        <p className="mt-2 text-muted-foreground">Click "New Restaurant" to add one.</p>
                        <Button asChild className="mt-4">
                            <Link href="/admin/food/new">
                                <PlusCircle className="mr-2 h-4 w-4"/>
                                New Restaurant
                            </Link>
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    </div>
  );
}
