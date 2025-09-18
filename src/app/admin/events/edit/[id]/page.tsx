
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
import { getEventById, updateEvent } from '@/lib/firestore';
import type { Event } from '@/lib/types';
import { format } from 'date-fns';

const ticketSchema = z.object({
  id: z.string().optional(),
  type: z.string().min(1, 'Ticket type is required'),
  price: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().min(0, 'Price must be a positive number')
  )
});

const eventSchema = z.object({
  name: z.string().min(5, "Event name must be at least 5 characters."),
  location: z.string().min(3, "Location is required."),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  description: z.string().min(20, "Description must be at least 20 characters."),
  tickets: z.array(ticketSchema).min(1, "At least one ticket type is required."),
});

type EventFormValues = z.infer<typeof eventSchema>;

export default function AdminEditEventPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { toast } = useToast();
  
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tickets",
  });

  useEffect(() => {
    if (id) {
      const fetchEvent = async () => {
        setLoading(true);
        const eventData = await getEventById(id);
        if (eventData) {
          setEvent(eventData);
          form.reset({
            ...eventData,
            date: format(new Date(eventData.date), "yyyy-MM-dd'T'HH:mm"),
            tickets: eventData.tickets.map(t => ({...t, id: t.id || Math.random().toString()}))
          });
          setImagePreview(eventData.imageUrl);
        } else {
          toast({
            variant: "destructive",
            title: "Not Found",
            description: "Event could not be found."
          });
          router.push('/admin/events');
        }
        setLoading(false);
      };
      fetchEvent();
    }
  }, [id, form, router, toast]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (values: EventFormValues) => {
    setIsSubmitting(true);
    try {
        const submissionData = {
          ...values,
          tickets: values.tickets.map(({id, ...rest}) => rest), // Remove temporary ID
        };
        await updateEvent(id, submissionData, imageFile);
        toast({
            title: "Success!",
            description: "Event has been updated.",
        });
        router.push('/admin/events');
    } catch (error) {
        console.error("Error updating event:", error);
        toast({
            variant: "destructive",
            title: "Update Failed",
            description: "There was an error updating the event.",
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
        <h1 className="font-headline text-4xl font-bold">Edit Event</h1>
        <p className="text-muted-foreground">Update the details for this event.</p>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Event Name</Label>
              <Input id="name" {...form.register("name")} />
              {form.formState.errors.name && <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>}
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" {...form.register("location")} />
                   {form.formState.errors.location && <p className="text-sm text-destructive">{form.formState.errors.location.message}</p>}
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="datetime-local" {...form.register("date")} />
                  {form.formState.errors.date && <p className="text-sm text-destructive">{form.formState.errors.date.message}</p>}
                </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...form.register("description")}
                rows={4}
              />
              {form.formState.errors.description && <p className="text-sm text-destructive">{form.formState.errors.description.message}</p>}
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
                    {imagePreview && <img src={imagePreview} alt="Event image preview" className="w-32 h-32 object-cover rounded-lg" />}
                </div>
                <p className="text-xs text-muted-foreground">Uploading a new image will replace the current one.</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Ticket Types</CardTitle>
                <CardDescription>Manage the ticket types for this event.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {fields.map((field, index) => (
                    <div key={field.id} className="flex items-end gap-4 p-4 border rounded-lg">
                        <div className="grid grid-cols-2 gap-4 flex-1">
                             <div className="space-y-2">
                                <Label htmlFor={`tickets.${index}.type`}>Ticket Type</Label>
                                <Input {...form.register(`tickets.${index}.type`)} />
                                {form.formState.errors.tickets?.[index]?.type && <p className="text-sm text-destructive">{form.formState.errors.tickets[index]?.type?.message}</p>}
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor={`tickets.${index}.price`}>Price (KES)</Label>
                                <Input type="number" {...form.register(`tickets.${index}.price`)} />
                                {form.formState.errors.tickets?.[index]?.price && <p className="text-sm text-destructive">{form.formState.errors.tickets[index]?.price?.message}</p>}
                            </div>
                        </div>
                        <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)} disabled={fields.length <= 1}>
                            <Trash className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
                 {form.formState.errors.tickets?.root && <p className="text-sm text-destructive">{form.formState.errors.tickets.root.message}</p>}
                <Button type="button" variant="outline" onClick={() => append({ type: '', price: 0, id: Math.random().toString() })}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Ticket Type
                </Button>
            </CardContent>
        </Card>

        <div className="flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={() => router.back()} disabled={isSubmitting}>Cancel</Button>
          <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Event
          </Button>
        </div>
      </form>
    </div>
  );
}
