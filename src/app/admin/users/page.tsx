
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Trash2,
  FilePenLine,
  Users as UsersIcon,
  Loader2
} from "lucide-react";
import Image from "next/image";
import { getAllUsers, deleteUserAccount } from "@/lib/firestore";
import type { User } from "@/lib/types";
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
import { useAuth } from '@/context/auth-context';


export default function ManageUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { loading: authLoading } = useAuth();

  const fetchUsers = async () => {
    setLoading(true);
    const userList = await getAllUsers();
    setUsers(userList);
    setLoading(false);
  }

  useEffect(() => {
    if (!authLoading) {
      fetchUsers();
    }
  }, [authLoading]);

  const handleDelete = async (userId: string) => {
    try {
        // Note: This is a placeholder. Deleting users is a sensitive operation
        // and requires a secure backend function. This will only delete the Firestore doc.
        await deleteUserAccount(userId);
        toast({
            title: "Success",
            description: "User has been deleted.",
        });
        fetchUsers(); // Refresh the list
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to delete user.",
        });
    }
  }

  const CrudActions = ({ user }: { user: User }) => (
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
                This action cannot be undone. This will permanently delete the user account
                for "{user.name}".
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete(user.id)}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
    </div>
  );


  return (
    <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
            <h1 className="font-headline text-4xl font-bold">Manage Users</h1>
            <p className="text-muted-foreground">View and manage all user accounts.</p>
        </div>
        <Card>
            <CardContent>
              {loading || authLoading ? (
                 <div className="flex justify-center items-center p-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary"/>
                </div>
              ) : users.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Image src={user.avatarUrl} alt={user.name} width={40} height={40} className="rounded-full" />
                                        <span className="font-medium">{user.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{user.email || 'N/A'}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{user.type || 'Client'}</Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={user.status === 'Active' ? 'default' : 'destructive'}>{user.status || 'Active'}</Badge>
                                </TableCell>
                                <TableCell>
                                    <CrudActions user={user} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
              ) : (
                <div className="text-center p-12">
                  <UsersIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-xl font-semibold">No Users Found</h3>
                  <p className="mt-2 text-muted-foreground">Registered users will appear here.</p>
                </div>
              )}
            </CardContent>
        </Card>
    </div>
  );
}
