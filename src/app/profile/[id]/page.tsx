import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Star, MapPin, User as UserIcon, MessageSquare, Clock } from "lucide-react";
import Link from "next/link";
import { ListingCard } from "@/components/listing-card";
import { placeholderImages } from "@/lib/placeholder-images";
import type { Listing } from "@/lib/types";

// Mock data
const mockUserData: any = {
    'seller1': {
        id: 'seller1',
        name: 'Artisan Co.',
        avatar: 'https://picsum.photos/seed/seller1/100/100',
        location: 'Nairobi, Kenya',
        memberSince: '2023-05-15',
        rating: 4.9,
        reviews: 213,
        listings: [
            { id: 'prod1', title: 'Hand-carved Wooden Elephant', price: 2500, category: 'Product', location: 'Nairobi', imageUrl: placeholderImages.product1.imageUrl, imageHint: placeholderImages.product1.imageHint },
            { id: 'prod3', title: 'Maasai Shuka Blanket', price: 800, category: 'Product', location: 'Nairobi', imageUrl: placeholderImages.product3.imageUrl, imageHint: placeholderImages.product3.imageHint },
        ]
    }
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}


export default function UserProfilePage({ params }: { params: { id: string } }) {
  const user = mockUserData[params.id];

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
                        src={user.avatar}
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
                                <span className="font-bold">{user.rating}</span>
                                <span>({user.reviews} reviews)</span>
                            </div>
                            <div className="flex items-center gap-2 justify-center">
                                <MapPin className="w-4 h-4"/>
                                <span>{user.location}</span>
                            </div>
                            <div className="flex items-center gap-2 justify-center">
                                <Clock className="w-4 h-4"/>
                                <span>Member since {formatDate(user.memberSince)}</span>
                            </div>
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
                {user.listings.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {user.listings.map((listing: Listing) => (
                            <ListingCard key={listing.id} listing={listing} />
                        ))}
                    </div>
                ) : (
                    <Card className="text-center p-12">
                         <p className="text-muted-foreground">This user has no active listings.</p>
                    </Card>
                )}
            </div>
        </div>
    </div>
  );
}
