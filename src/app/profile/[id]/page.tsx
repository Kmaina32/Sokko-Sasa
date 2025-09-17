
'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, MapPin, User as UserIcon, MessageSquare, Clock, Package, Loader2 } from "lucide-react";
import Link from "next/link";
import { ListingCard } from "@/components/listing-card";
import type { Listing, User } from "@/lib/types";
import { getUserData, getListings } from "@/lib/firestore";
import { useAuth } from "@/context/auth-context";


const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}


export default function UserProfilePage({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<User | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const { loading: authLoading } = useAuth();
  const { id } = params;

  useEffect(() => {
    const fetchUserData = async () => {
        setLoading(true);
        const userData = await getUserData(id);
        setUser(userData);
        if (userData) {
            const userListings = await getListings({ sellerId: id });
            setListings(userListings);
        }
        setLoading(false);
    }
    if (!authLoading) {
      fetchUserData();
    }
  }, [id, authLoading]);


  if (loading || authLoading) {
    return (
        <div className="flex justify-center items-center h-[50vh]">
            <Loader2 className="h-8 w-8 animate-spin text-primary"/>
        </div>
    )
  }

  if (!user) {
    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="text-center p-12">
                <UserIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                <CardTitle className="text-2xl mt-4">User Not Found</CardTitle>
                <CardContent>
                    <p className="mt-4 text-muted-foreground">Sorry, we couldn't find the user you're looking for.</p>
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="bg-muted/20">
        <div className="container mx-auto px-4 py-8">
            <Card className="mb-8">
                <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
                    <Image
                        src={user.avatarUrl}
                        alt={user.name}
                        width={150}
                        height={150}
                        className="rounded-full border-4 border-primary"
                    />
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="font-headline text-4xl font-bold">{user.name}</h1>
                        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-muted-foreground mt-2">
                             <div className="flex items-center gap-2 justify-center">
                                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400"/>
                                <span className="font-bold">{user.rating || 'N/A'}</span>
                                <span>({user.reviews || 0} reviews)</span>
                            </div>
                            <div className="flex items-center gap-2 justify-center">
                                <MapPin className="w-4 h-4"/>
                                <span>{user.location || 'Unknown'}</span>
                            </div>
                             {user.memberSince && (
                                <div className="flex items-center gap-2 justify-center">
                                    <Clock className="w-4 h-4"/>
                                    <span>Member since {formatDate(user.memberSince)}</span>
                                </div>
                            )}
                        </div>
                    </div>
                     <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                       <Link href="/messages">
                           <MessageSquare className="mr-2 h-5 w-5"/>
                           Contact
                       </Link>
                    </Button>
                </CardContent>
            </Card>

            <div>
                <h2 className="text-3xl font-bold mb-6">Listings from {user.name}</h2>
                {listings.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {listings.map((listing: Listing) => (
                            <ListingCard key={listing.id} listing={listing} />
                        ))}
                    </div>
                ) : (
                    <Card className="text-center p-12">
                         <Package className="mx-auto h-12 w-12 text-muted-foreground"/>
                         <p className="mt-4 text-muted-foreground">This user has no active listings.</p>
                    </Card>
                )}
            </div>
        </div>
    </div>
  );
}
