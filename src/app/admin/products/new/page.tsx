
'use client';

import { useState } from 'react';
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
import { createListing } from '@/lib/firestore';
import { useRouter } from 'next/navigation';
import { Loader2, UploadCloud } from 'lucide-react';

const listingSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long."),
  category: z.enum(["Product", "Service", "Job", "Property"]),
  price: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().min(0, "Price must be a positive number.")
  ),
  location: z.string().min(3, "Location is required."),
  description: z.string().min(20, "Description must be at least 20 characters long."),
  sellerId: z.string().min(1, "Seller ID is required."), // Admin needs to assign a seller
});

type ListingFormValues = z.infer<typeof listingSchema>;

export default function AdminNewProductPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const form = useForm<ListingFormValues>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      title: "",
      category: "Product",
      price: 0,
      location: "",
      description: "",
      sellerId: "",
    },
  });

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    }
  }

  const onSubmit = async (values: ListingFormValues) => {
    setIsSubmitting(true);
    try {
        const newListingId = await createListing(values, values.sellerId, imageFile);
        toast({
            title: "Success!",
            description: "New product has been created.",
        });
        router.push(`/admin/products`);
    } catch (error) {
        console.error("Error creating listing:", error);
        toast({
            variant: "destructive",
            title: "Submission Failed",
            description: "There was an error creating the product.",
        });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <h1 className="font-headline text-4xl font-bold">Create New Product</h1>
        <p className="text-muted-foreground">Fill in the details to add a new product to the marketplace.</p>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
            <CardDescription>
              Provide the basic information for the new product.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Product Title</Label>
              <Input id="title" {...form.register("title")} placeholder="e.g., Brand New Sofa Set"/>
              {form.formState.errors.title && <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={(value) => form.setValue("category", value as ListingFormValues['category'])} defaultValue="Product">
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
                <Input id="price" type="number" {...form.register("price")} placeholder="e.g., 15000" />
                {form.formState.errors.price && <p className="text-sm text-destructive">{form.formState.errors.price.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" {...form.register("location")} placeholder="e.g., Nairobi" />
                {form.formState.errors.location && <p className="text-sm text-destructive">{form.formState.errors.location.message}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sellerId">Seller ID</Label>
              <Input id="sellerId" {...form.register("sellerId")} placeholder="Enter the seller's user ID"/>
              {form.formState.errors.sellerId && <p className="text-sm text-destructive">{form.formState.errors.sellerId.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...form.register("description")}
                rows={6}
                placeholder="Describe the product in detail..."
              />
              {form.formState.errors.description && <p className="text-sm text-destructive">{form.formState.errors.description.message}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="main-image">Main Image</Label>
                <div className="flex items-center gap-4">
                    <div className="w-full">
                        <label htmlFor="main-image-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                                <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> product image</p>
                            </div>
                            <Input id="main-image-upload" type="file" className="hidden" accept="image/*" onChange={handleMainImageChange} />
                        </label>
                    </div>
                    {imagePreview && <img src={imagePreview} alt="Main image preview" className="w-32 h-32 object-cover rounded-lg" />}
                </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={() => router.back()} disabled={isSubmitting}>Cancel</Button>
          <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
              Create Product
          </Button>
        </div>
      </form>
    </div>
  );
}
