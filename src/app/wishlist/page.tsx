
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { getWishlistItems, getListingById } from '@/lib/firestore';
import type { Listing } from '@/lib/types';
import { ListingCard } from '@/components/listing-card';
import { Loader2, Bookmark, LogIn } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function WishlistPage() {
  const { user, loading: authLoading } = useAuth();
  const [wishlistItems, setWishlistItems] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      const unsubscribe = getWishlistItems(user.uid, async (itemIds) => {
        setLoading(true);
        const items = await Promise.all(
          Array.from(itemIds).map(id => getListingById(id))
        );
        setWishlistItems(items.filter((item): item is Listing => item !== null));
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
        setLoading(false);
    }
  }, [user]);

  if (authLoading || loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
        <div className="container mx-auto max-w-3xl px-4 py-8">
            <Card className="text-center">
                <CardHeader>
                    <CardTitle>Please Log In</CardTitle>
                    <CardDescription>You need to be logged in to view your wishlist.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href="/login">
                            <LogIn className="mr-2 h-4 w-4"/>
                            Login
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-headline text-4xl font-bold">My Wishlist</h1>
        <p className="text-muted-foreground">Items you've saved for later.</p>
      </div>
      
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <ListingCard key={item.id} listing={item} />
          ))}
        </div>
      ) : (
        <Card className="text-center p-12">
          <Bookmark className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-xl font-semibold">Your wishlist is empty</h3>
          <p className="mt-2 text-muted-foreground">
            Click the bookmark icon on any item to save it for later.
          </p>
          <Button asChild className="mt-6">
            <Link href="/shop">Start Browsing</Link>
          </Button>
        </Card>
      )}
    </div>
  );
}

