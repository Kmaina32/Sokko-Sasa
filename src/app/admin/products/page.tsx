
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
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Trash2,
  FilePenLine,
  Package,
  Loader2,
  PlusCircle,
} from "lucide-react";
import { getListings, deleteListing } from "@/lib/firestore";
import type { Listing } from "@/lib/types";
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
} from "@/components/ui/alert-dialog"
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 0,
    }).format(amount);
}


export default function ManageProductsPage() {
  const [products, setProducts] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { loading: authLoading } = useAuth();

  const fetchProducts = async () => {
      setLoading(true);
      const productList = await getListings();
      setProducts(productList);
      setLoading(false);
  }

  useEffect(() => {
    if (!authLoading) {
      fetchProducts();
    }
  }, [authLoading]);

  const handleDelete = async (productId: string) => {
    try {
        await deleteListing(productId);
        toast({
            title: "Success",
            description: "Product has been deleted.",
        });
        fetchProducts(); // Refresh the list
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to delete product.",
        });
    }
  }


  const CrudActions = ({ product } : { product: Listing}) => (
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
                This action cannot be undone. This will permanently delete the product
                "{product.title}".
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete(product.id)}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
    </div>
);


  return (
    <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-4">
            <div>
                <h1 className="font-headline text-4xl font-bold">Manage Products</h1>
                <p className="text-muted-foreground">Oversee all products listed on the marketplace.</p>
            </div>
            <Button asChild>
                <Link href="/admin/products/new">
                    <PlusCircle className="mr-2 h-4 w-4"/>
                    New Product
                </Link>
            </Button>
        </div>
        <Card>
            <CardContent className="p-0">
              {loading || authLoading ? (
                <div className="flex justify-center items-center p-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary"/>
                </div>
              ) : products.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product Name</TableHead>
                            <TableHead>Seller</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell className="font-medium">{product.title}</TableCell>
                                <TableCell>{product.seller?.name ?? 'N/A'}</TableCell>
                                <TableCell>{formatCurrency(product.price)}</TableCell>
                                <TableCell>
                                    <CrudActions product={product} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
              ) : (
                <div className="text-center p-12">
                  <Package className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-xl font-semibold">No Products Found</h3>
                  <p className="mt-2 text-muted-foreground">Click "New Product" to add a listing.</p>
                   <Button asChild className="mt-4">
                        <Link href="/admin/products/new">
                            <PlusCircle className="mr-2 h-4 w-4"/>
                            New Product
                        </Link>
                    </Button>
                </div>
              )}
            </CardContent>
        </Card>
    </div>
  );
}
