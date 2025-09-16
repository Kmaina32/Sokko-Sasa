"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Sparkles, UploadCloud, Image as ImageIcon, Wand2 } from "lucide-react";
import {
  generateDescriptionFromTextAction,
  generateDescriptionFromImageAction,
} from "@/app/actions";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

export function CreateListingForm() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [description, setDescription] = useState("");
  const [aiKeywords, setAiKeywords] = useState("");
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

  const handleGenerateFromText = async () => {
    if (!aiKeywords) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter some keywords to generate a description.",
      });
      return;
    }
    setIsGenerating(true);
    const result = await generateDescriptionFromTextAction({ keywords: aiKeywords });
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
  
  const handleGenerateFromImage = async () => {
    if (!aiImage) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Please upload an image to generate a description.",
        });
        return;
    }
    setIsGenerating(true);

    const reader = new FileReader();
    reader.readAsDataURL(aiImage);
    reader.onload = async () => {
        const dataUri = reader.result as string;
        const result = await generateDescriptionFromImageAction({ photoDataUris: [dataUri] });

        if (result.success && result.description) {
            setDescription(result.description);
            form.setValue("description", result.description);
            toast({
              title: "Success!",
              description: "Description generated from your image.",
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
    reader.onerror = () => {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to read the image file.",
        });
        setIsGenerating(false);
    }
  };


  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAiImage(file);
      setAiImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <form onSubmit={form.handleSubmit(() => {})} className="space-y-8">
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="text-accent" />
            Ad Description Generator
          </CardTitle>
          <CardDescription>
            Use AI to craft the perfect description for your ad. You can edit it afterwards.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="text">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="text"><Wand2 className="mr-2 h-4 w-4"/>From Text</TabsTrigger>
              <TabsTrigger value="image"><ImageIcon className="mr-2 h-4 w-4"/>From Image</TabsTrigger>
            </TabsList>
            <TabsContent value="text" className="mt-4 space-y-4">
              <Label htmlFor="ai-keywords">Keywords or phrases</Label>
              <Textarea
                id="ai-keywords"
                value={aiKeywords}
                onChange={(e) => setAiKeywords(e.target.value)}
                placeholder="e.g., red leather sofa, 3-seater, good condition, modern design"
              />
              <Button onClick={handleGenerateFromText} disabled={isGenerating} type="button">
                {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Generate
              </Button>
            </TabsContent>
            <TabsContent value="image" className="mt-4 space-y-4">
                 <Label htmlFor="ai-image">Upload an image</Label>
                 <div className="flex items-center gap-4">
                     <div className="w-full">
                         <label htmlFor="ai-image-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                             <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                 <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                                 <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                 <p className="text-xs text-muted-foreground">PNG, JPG or WEBP (MAX. 800x400px)</p>
                             </div>
                             <Input id="ai-image-upload" type="file" className="hidden" accept="image/*" onChange={handleImageFileChange} />
                         </label>
                     </div>
                     {aiImagePreview && <img src={aiImagePreview} alt="preview" className="w-32 h-32 object-cover rounded-lg" />}
                 </div>
                 <Button onClick={handleGenerateFromImage} disabled={isGenerating || !aiImage} type="button">
                     {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                     Generate
                 </Button>
             </TabsContent>
          </Tabs>
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
        <Button variant="outline" type="button">Save as Draft</Button>
        <Button type="submit" className="bg-primary hover:bg-primary/90">Post Ad</Button>
      </div>
    </form>
  );
}
