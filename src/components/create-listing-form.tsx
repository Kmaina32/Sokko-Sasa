"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Sparkles, UploadCloud } from "lucide-react";
import { generateAdAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createListing } from "@/lib/firestore";
import { useRouter } from "next/navigation";


const listingSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long."),
  category: z.enum(["Product", "Service", "Job", "Property"]),
  price: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().min(0, "Price must be a positive number.")
  ),
  location: z.string().min(3, "Location is required."),
  description: z.string().min(20, "Description must be at least 20 characters long."),
  imageUrl: z.string().url("A valid image URL is required.").optional(),
});

type ListingFormValues = z.infer<typeof listingSchema>;

export function CreateListingForm({ userId }: { userId: string}) {
  const { toast } = useToast();
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [description, setDescription] = useState("");
  const [aiKeywords, setAiKeywords] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [aiImage, setAiImage] = useState<File | null>(null);
  const [aiImagePreview, setAiImagePreview] = useState<string | null>(null);

  const form = useForm<ListingFormValues>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      title: "",
      category: "Product",
      price: 0,
      location: "",
      description: "",
    },
  });
  
  const onSubmit = async (values: ListingFormValues) => {
    setIsSubmitting(true);
    try {
        const newListingId = await createListing(values, userId, imageFile);
        toast({
            title: "Success!",
            description: "Your ad has been posted.",
        });
        router.push(`/listings/${newListingId}`);
    } catch (error) {
        console.error("Error creating listing:", error);
        toast({
            variant: "destructive",
            title: "Submission Failed",
            description: "There was an error posting your ad. Please try again.",
        });
    } finally {
        setIsSubmitting(false);
    }
  }

  const handleGenerateDescription = async () => {
    if (!aiKeywords && !aiImage) {
      toast({
        variant: "destructive",
        title: "Input Required",
        description:
          "Please provide keywords or an image to generate a description.",
      });
      return;
    }
    setIsGenerating(true);

    let dataUri: string | undefined = undefined;
    if (aiImage) {
        dataUri = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(aiImage);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    }

    const result = await generateAdAction({
      keywords: aiKeywords,
      photoDataUri: dataUri,
    });

    if (result.success && result.description) {
      setDescription(result.description);
      form.setValue("description", result.description);
      toast({
        title: "Success!",
        description: "Description generated with AI.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: result.error,
      });
    }
    setIsGenerating(false);
  };


  const handleAiImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAiImage(file);
      setAiImagePreview(URL.createObjectURL(file));
    }
  };
  
  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Listing Details</CardTitle>
          <CardDescription>
            Provide the basic information for your ad.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Ad Title</Label>
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
                <Label htmlFor="main-image">Main Image</Label>
                <div className="flex items-center gap-4">
                    <div className="w-full">
                        <label htmlFor="main-image-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                                <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> main image</p>
                            </div>
                            <Input id="main-image-upload" type="file" className="hidden" accept="image/*" onChange={handleMainImageChange} />
                        </label>
                    </div>
                    {imagePreview && <img src={imagePreview} alt="Main image preview" className="w-32 h-32 object-cover rounded-lg" />}
                </div>
            </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="text-accent" />
            Ad Description Generator
          </CardTitle>
          <CardDescription>
            Use AI to craft the perfect description for your ad. Provide keywords, an image, or both.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ai-keywords">Keywords or phrases (Optional)</Label>
            <Textarea
              id="ai-keywords"
              value={aiKeywords}
              onChange={(e) => setAiKeywords(e.target.value)}
              placeholder="e.g., red leather sofa, 3-seater, good condition, modern design"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ai-image">Upload an image (Optional)</Label>
            <div className="flex items-center gap-4">
                <div className="w-full">
                    <label htmlFor="ai-image-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        </div>
                        <Input id="ai-image-upload" type="file" className="hidden" accept="image/*" onChange={handleAiImageFileChange} />
                    </label>
                </div>
                {aiImagePreview && <img src={aiImagePreview} alt="AI image preview" className="w-32 h-32 object-cover rounded-lg" />}
            </div>
          </div>
          
          <Button onClick={handleGenerateDescription} disabled={isGenerating} type="button">
            {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
            Generate Description
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Your Ad Description</CardTitle>
            <CardDescription>This will be shown on your ad. Edit it as you see fit.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-2">
                <Textarea
                    id="description"
                    {...form.register("description")}
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                        form.setValue("description", e.target.value);
                    }}
                    rows={8}
                    placeholder="Describe your item in detail..."
                />
                 {form.formState.errors.description && <p className="text-sm text-destructive">{form.formState.errors.description.message}</p>}
            </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-2">
        <Button variant="outline" type="button" disabled={isSubmitting}>Save as Draft</Button>
        <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
            Post Ad
        </Button>
      </div>
    </form>
  );
}
