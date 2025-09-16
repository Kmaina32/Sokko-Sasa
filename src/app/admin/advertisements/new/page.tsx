
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
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { createAdvertisement } from '@/lib/firestore';
import { useRouter } from 'next/navigation';
import { Loader2, UploadCloud } from 'lucide-react';

const adSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long."),
  description: z.string().min(10, "Description is required."),
  isActive: z.boolean().default(true),
});

type AdFormValues = z.infer<typeof adSchema>;

export default function AdminNewAdvertisementPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const form = useForm<AdFormValues>({
    resolver: zodResolver(adSchema),
    defaultValues: {
      title: "",
      description: "",
      isActive: true,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    }
  }

  const onSubmit = async (values: AdFormValues) => {
    if (!imageFile) {
        toast({
            variant: 'destructive',
            title: 'Image required',
            description: 'Please upload an image for the advertisement.'
        });
        return;
    }

    setIsSubmitting(true);
    try {
        await createAdvertisement(values, imageFile);
        toast({
            title: "Success!",
            description: "New advertisement has been created.",
        });
        router.push(`/admin/advertisements`);
    } catch (error) {
        console.error("Error creating advertisement:", error);
        toast({
            variant: "destructive",
            title: "Submission Failed",
            description: "There was an error creating the advertisement.",
        });
    } finally {
        setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <h1 className="font-headline text-4xl font-bold">Create New Advertisement</h1>
        <p className="text-muted-foreground">Fill in the details to add a new promotion to the homepage.</p>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Advertisement Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Ad Title</Label>
              <Input id="title" {...form.register("title")} placeholder="e.g., Holiday Season Sale"/>
              {form.formState.errors.title && <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...form.register("description")}
                rows={4}
                placeholder="Describe the promotion..."
              />
              {form.formState.errors.description && <p className="text-sm text-destructive">{form.formState.errors.description.message}</p>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="main-image">Promotional Image</Label>
                <div className="flex items-center gap-4">
                    <div className="w-full">
                        <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                                <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> an image</p>
                            </div>
                            <Input id="image-upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} required />
                        </label>
                    </div>
                    {imagePreview && <img src={imagePreview} alt="Ad image preview" className="w-32 h-32 object-cover rounded-lg" />}
                </div>
            </div>

             <div className="flex items-center space-x-2">
                <Switch 
                    id="isActive" 
                    checked={form.watch('isActive')} 
                    onCheckedChange={(checked) => form.setValue('isActive', checked)}
                />
                <Label htmlFor="isActive">Set as active</Label>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={() => router.back()} disabled={isSubmitting}>Cancel</Button>
          <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
              Create Ad
          </Button>
        </div>
      </form>
    </div>
  );
}
