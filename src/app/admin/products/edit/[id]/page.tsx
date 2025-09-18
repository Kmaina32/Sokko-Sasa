
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { getListingById, updateListing } from '@/lib/firestore';
import { useRouter, useParams } from 'next/navigation';
import { Loader2, UploadCloud } from 'lucide-react';
import type { Listing } from '@/lib/types';

const listingSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long."),
  category: z.enum(["Product", "Service", "Job", "Property"]),
  price: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().min(0, "Price must be a positive number.")
  ),
  location: z.string().min(3, "Location is required."),
  description: z.string().min(20, "Description must be at least 20 characters long."),
});

type ListingFormValues = z.infer<typeof listingSchema>;

export default function AdminEditProductPage() {
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [listing, setListing] = useState<Listing | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const form = useForm<ListingFormValues>({
    resolver: zodResolver(listingSchema),
  });

  useEffect(() => {
    if (id) {
      const fetchListing = async () => {
        setLoading(true);
        const listingData = await getListingById(id);
        if (listingData) {
          setListing(listingData);
          form.reset(listingData);
          setImagePreview(listingData.imageUrl);
        } else {
          toast({
            variant: "destructive",
            title: "Not Found",
            description: "Product could not be found."
          });
          router.push('/admin/products');
        }
        setLoading(false);
      };
      fetchListing();
    }
  }, [id, form, router, toast]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    }
  }

  const onSubmit = async (values: ListingFormValues) => {
    setIsSubmitting(true);
    try {
        await updateListing(id, values, imageFile);
        toast({
            title: "Success!",
            description: "Product has been updated.",
        });
        router.push(`/admin/products`);
    } catch (error) {
        console.error("Error updating product:", error);
        toast({
            variant: "destructive",
            title: "Update Failed",
            description: "There was an error updating the product.",
        });
    } finally {
        setIsSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <h1 className="font-headline text-4xl font-bold">Edit Product</h1>
        <p className="text-muted-foreground">Update the details for this product.</p>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Product Title</Label>
              <Input id="title" {...form.register("title")} />
              {form.formState.errors.title && <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>}
            </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={(value) => form.setValue("category", value as ListingFormValues['category'])} defaultValue={form.getValues('category')}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Product">Product</SelectItem>
                    <SelectItem value="Service">Service</SelectItem>
                    <SelectItem value="Job">Job</SelectItem>
                    <SelectItem value="Property">Property</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price (KES)</Label>
                <Input id="price" type="number" {...form.register("price")} />
                {form.formState.errors.price && <p className="text-sm text-destructive">{form.formState.errors.price.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" {...form.register("location")} />
                {form.formState.errors.location && <p className="text-sm text-destructive">{form.formState.errors.location.message}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...form.register("description")}
                rows={6}
              />
              {form.formState.errors.description && <p className="text-sm text-destructive">{form.formState.errors.description.message}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="main-image">Main Image</Label>
                <div className="flex items-center gap-4">
                    <div className="w-full">
                        <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                                <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> a new image</p>
                            </div>
                            <Input id="image-upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                        </label>
                    </div>
                    {imagePreview && <img src={imagePreview} alt="Product image preview" className="w-32 h-32 object-cover rounded-lg" />}
                </div>
                 <p className="text-xs text-muted-foreground">Uploading a new image will replace the old one.</p>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={() => router.back()} disabled={isSubmitting}>Cancel</Button>
          <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
              Update Product
          </Button>
        </div>
      </form>
    </div>
  );
}
