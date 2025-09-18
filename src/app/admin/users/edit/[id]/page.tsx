
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { getUserData, updateUserData } from '@/lib/firestore';
import { useRouter, useParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import type { User } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';

const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long."),
  type: z.enum(["Client", "Vendor", "Driver", "Admin"]),
  status: z.enum(["Active", "Suspended"]),
});

type UserFormValues = z.infer<typeof userSchema>;

export default function AdminEditUserPage() {
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [user, setUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
  });

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        setLoading(true);
        const userData = await getUserData(id);
        if (userData) {
          setUser(userData);
          form.reset({
            name: userData.name,
            type: userData.type,
            status: userData.status,
          });
        } else {
          toast({
            variant: "destructive",
            title: "Not Found",
            description: "User could not be found."
          });
          router.push('/admin/users');
        }
        setLoading(false);
      };
      fetchUser();
    }
  }, [id, form, router, toast]);


  const onSubmit = async (values: UserFormValues) => {
    setIsSubmitting(true);
    try {
        await updateUserData(id, values);
        toast({
            title: "Success!",
            description: "User has been updated.",
        });
        router.push(`/admin/users`);
        router.refresh();
    } catch (error) {
        console.error("Error updating user:", error);
        toast({
            variant: "destructive",
            title: "Update Failed",
            description: "There was an error updating the user.",
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

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <h1 className="font-headline text-4xl font-bold">Edit User</h1>
        <p className="text-muted-foreground">Update the details for {user.name}.</p>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>User Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Image src={user.avatarUrl} alt={user.name} width={80} height={80} className="rounded-full" />
              <div>
                <p className="text-lg font-semibold">{user.name}</p>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" {...form.register("name")} />
              {form.formState.errors.name && <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="type">User Type</Label>
                    <Select onValueChange={(value) => form.setValue("type", value as UserFormValues['type'])} defaultValue={user.type}>
                    <SelectTrigger id="type">
                        <SelectValue placeholder="Select user type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Client">Client</SelectItem>
                        <SelectItem value="Vendor">Vendor</SelectItem>
                        <SelectItem value="Driver">Driver</SelectItem>
                        <SelectItem value="Admin">Admin</SelectItem>
                    </SelectContent>
                    </Select>
                     {form.formState.errors.type && <p className="text-sm text-destructive">{form.formState.errors.type.message}</p>}
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="status">User Status</Label>
                    <Select onValueChange={(value) => form.setValue("status", value as UserFormValues['status'])} defaultValue={user.status}>
                    <SelectTrigger id="status">
                        <SelectValue placeholder="Select user status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Suspended">Suspended</SelectItem>
                    </SelectContent>
                    </Select>
                     {form.formState.errors.status && <p className="text-sm text-destructive">{form.formState.errors.status.message}</p>}
                </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={() => router.back()} disabled={isSubmitting}>Cancel</Button>
          <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
              Update User
          </Button>
        </div>
      </form>
    </div>
  );
}
