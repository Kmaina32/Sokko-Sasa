"use client";

import { CreateListingForm } from "@/components/create-listing-form";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LogIn } from "lucide-react";

export default function CreateListingPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            // Optionally, redirect to login page if user is not authenticated
            // router.push('/login');
        }
    }, [user, loading, router]);


  if (loading) {
      return (
          <div className="container mx-auto max-w-3xl px-4 py-8">
             <div className="animate-pulse space-y-8">
                  <div className="h-24 bg-muted rounded-lg"></div>
                  <div className="h-96 bg-muted rounded-lg"></div>
                  <div className="h-64 bg-muted rounded-lg"></div>
             </div>
          </div>
      )
  }

  if (!user) {
    return (
        <div className="container mx-auto max-w-3xl px-4 py-8">
            <Card className="text-center">
                <CardHeader>
                    <CardTitle>Authentication Required</CardTitle>
                    <CardDescription>You need to be logged in to post an ad.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href="/login">
                            <LogIn className="mr-2 h-4 w-4"/>
                            Login to Continue
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="font-headline text-4xl font-bold text-primary">
          Post Your Ad
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Fill in the details below to reach thousands of potential buyers.
        </p>
      </div>
      <CreateListingForm userId={user.uid} />
    </div>
  );
}
