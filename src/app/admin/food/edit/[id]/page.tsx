
'use client';

import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Trash, PlusCircle, UploadCloud } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { getRestaurantById, updateRestaurant } from '@/lib/firestore';
import type { Restaurant } from '@/lib/types';

const menuItemSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Item name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().min(0, 'Price must be a positive number')
  )
});

const restaurantSchema = z.object({
  name: z.string().min(3, "Restaurant name is required."),
  cuisine: z.string().min(3, "Cuisine type is required."),
  location: z.string().min(3, "Location is required."),
  menu: z.array(menuItemSchema).min(1, "At least one menu item is required."),
});

type RestaurantFormValues = z.infer<typeof restaurantSchema>;

export default function AdminEditRestaurantPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { toast } = useToast();
  
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const form = useForm<RestaurantFormValues>({
    resolver: zodResolver(restaurantSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "menu",
  });

  useEffect(() => {
    if (id) {
      const fetchRestaurant = async () => {
        setLoading(true);
        const data = await getRestaurantById(id);
        if (data) {
          setRestaurant(data);
          form.reset({
            ...data,
            menu: data.menu.map(item => ({...item, id: item.id || Math.random().toString()}))
          });
          setImagePreview(data.imageUrl);
        } else {
          toast({
            variant: "destructive",
            title: "Not Found",
            description: "Restaurant could not be found."
          });
          router.push('/admin/food');
        }
        setLoading(false);
      };
      fetchRestaurant();
    }
  }, [id, form, router, toast]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (values: RestaurantFormValues) => {
    setIsSubmitting(true);
    try {
        const submissionData = {
          ...values,
          menu: values.menu.map(({id, ...rest}) => rest), // Remove temporary ID
        };
        await updateRestaurant(id, submissionData, imageFile);
        toast({
            title: "Success!",
            description: "Restaurant has been updated.",
        });
        router.push('/admin/food');
    } catch (error) {
        console.error("Error updating restaurant:", error);
        toast({
            variant: "destructive",
            title: "Update Failed",
            description: "There was an error updating the restaurant.",
        });
    } finally {
        setIsSubmitting(false);
    }
  };
  
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
        <h1 className="font-headline text-4xl font-bold">Edit Restaurant</h1>
        <p className="text-muted-foreground">Update the details for this restaurant.</p>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Restaurant Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Restaurant Name</Label>
              <Input id="name" {...form.register("name")} />
              {form.formState.errors.name && <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="cuisine">Cuisine Type</Label>
              <Input id="cuisine" {...form.register("cuisine")} />
              {form.formState.errors.cuisine && <p className="text-sm text-destructive">{form.formState.errors.cuisine.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" {...form.register("location")} />
              {form.formState.errors.location && <p className="text-sm text-destructive">{form.formState.errors.location.message}</p>}
            </div>
            <div className="space-y-2">
                <Label>Promotional Image</Label>
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
                    {imagePreview && <img src={imagePreview} alt="Restaurant image preview" className="w-32 h-32 object-cover rounded-lg" />}
                </div>
                <p className="text-xs text-muted-foreground">Uploading a new image will replace the current one.</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Menu Items</CardTitle>
                <CardDescription>Manage the menu items for this restaurant.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {fields.map((field, index) => (
                    <div key={field.id} className="flex items-start gap-4 p-4 border rounded-lg">
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                             <div className="space-y-2">
                                <Label htmlFor={`menu.${index}.name`}>Item Name</Label>
                                <Input {...form.register(`menu.${index}.name`)} />
                                {form.formState.errors.menu?.[index]?.name && <p className="text-sm text-destructive">{form.formState.errors.menu[index]?.name?.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor={`menu.${index}.description`}>Description</Label>
                                <Textarea {...form.register(`menu.${index}.description`)} />
                                {form.formState.errors.menu?.[index]?.description && <p className="text-sm text-destructive">{form.formState.errors.menu[index]?.description?.message}</p>}
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor={`menu.${index}.price`}>Price (KES)</Label>
                                <Input type="number" {...form.register(`menu.${index}.price`)} />
                                {form.formState.errors.menu?.[index]?.price && <p className="text-sm text-destructive">{form.formState.errors.menu[index]?.price?.message}</p>}
                            </div>
                        </div>
                        <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)} disabled={fields.length <= 1}>
                            <Trash className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
                 {form.formState.errors.menu?.root && <p className="text-sm text-destructive">{form.formState.errors.menu.root.message}</p>}
                <Button type="button" variant="outline" onClick={() => append({ name: '', description: '', price: 0, id: Math.random().toString() })}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Menu Item
                </Button>
            </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={() => router.back()} disabled={isSubmitting}>Cancel</Button>
          <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Restaurant
          </Button>
        </div>
      </form>
    </div>
  );
}
