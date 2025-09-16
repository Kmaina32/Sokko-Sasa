
'use client';

import Link from "next/link";
import {
  Package,
  Search,
  ShoppingBag,
  Utensils,
  Car,
  Building,
  HeartPulse,
  Wrench,
  Megaphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { ListingCard } from "@/components/listing-card";
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import type { Listing, Advertisement } from "@/lib/types";

const categories = [
  {
    name: "Products",
    icon: ShoppingBag,
    href: "/shop",
    bgColor: "bg-orange-100",
    textColor: "text-orange-600",
  },
  {
    name: "Food",
    icon: Utensils,
    href: "/food-delivery",
    bgColor: "bg-red-100",
    textColor: "text-red-600",
  },
  {
    name: "Rides",
    icon: Car,
    href: "/rides",
    bgColor: "bg-blue-100",
    textColor: "text-blue-600",
  },
  {
    name: "Real Estate",
    icon: Building,
    href: "/real-estate",
    bgColor: "bg-green-100",
    textColor: "text-green-600",
  },
  {
    name: "Health",
    icon: HeartPulse,
    href: "/medical",
    bgColor: "bg-pink-100",
    textColor: "text-pink-600",
  },
  {
    name: "Services",
    icon: Wrench,
    href: "/services",
    bgColor: "bg-indigo-100",
    textColor: "text-indigo-600",
  },
];

interface HomePageClientProps {
  featuredListings: Listing[];
  activeAdvertisements: Advertisement[];
}

export function HomePageClient({ featuredListings, activeAdvertisements }: HomePageClientProps) {
  return (
    <div className="flex-1">
      <section className="relative bg-muted/20">
        <div className="container mx-auto px-4 pt-16 pb-12 md:pt-24 md:pb-20 text-center">
            <div className="mb-4 bg-primary/10 backdrop-blur-sm p-3 rounded-full inline-block">
                <Package className="h-10 w-10 text-primary"/>
            </div>
            <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">
                Everything You Need, <br /> All in One Place
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Shop products, book services, find rides, discover properties, and much more. Your complete marketplace solution.
            </p>
            <div className="mt-8 max-w-xl mx-auto">
                <div className="relative">
                    <Input placeholder="Search everything..." className="h-14 pl-12 rounded-full text-lg shadow-lg"/>
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground"/>
                    <Button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-10 w-24 text-base" size="lg">Search</Button>
                </div>
            </div>
             <div className="mt-12">
              <h2 className="text-lg font-bold text-center mb-6">Explore Sokko Sasa</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 max-w-3xl mx-auto">
                  {categories.map((cat) => (
                      <Link href={cat.href} key={cat.name} className="group text-center">
                          <div className={`flex items-center justify-center h-20 w-20 rounded-full mx-auto mb-2 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg ${cat.bgColor}`}>
                              <cat.icon className={`h-8 w-8 ${cat.textColor}`} />
                          </div>
                          <p className="font-semibold text-sm text-muted-foreground group-hover:text-primary">{cat.name}</p>
                      </Link>
                  ))}
              </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Promotions</h2>
          {activeAdvertisements.length > 0 ? (
            <Carousel opts={{ loop: true }}>
              <CarouselContent>
                {activeAdvertisements.map((ad) => (
                  <CarouselItem key={ad.id}>
                    <div className="relative aspect-[16/7] w-full overflow-hidden rounded-lg">
                      <Image
                        src={ad.imageUrl}
                        alt={ad.title}
                        fill
                        className="object-cover"
                        data-ai-hint={ad.imageHint}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-8 text-white">
                        <h3 className="text-4xl font-bold">{ad.title}</h3>
                        <p className="mt-2 max-w-lg text-lg opacity-90">{ad.description}</p>
                        <Button className="mt-4" size="lg">Learn More</Button>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          ) : (
            <Card className="text-center p-12">
              <Megaphone className="mx-auto h-12 w-12 text-muted-foreground"/>
              <h3 className="mt-4 text-xl font-semibold">No Promotions Currently</h3>
              <p className="mt-2 text-muted-foreground">Check back soon for exciting deals and announcements.</p>
            </Card>
          )}
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Listings</h2>
            <Button variant="outline" asChild>
                <Link href="/shop">View All &rarr;</Link>
            </Button>
          </div>
          {featuredListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
                ))}
            </div>
          ) : (
            <Card className="text-center p-12">
              <Package className="mx-auto h-12 w-12 text-muted-foreground"/>
              <h3 className="mt-4 text-xl font-semibold">No Featured Listings</h3>
              <p className="mt-2 text-muted-foreground">Check back later to see what's new and trending.</p>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
