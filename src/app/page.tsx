
import { getListings, getAdvertisements } from "@/lib/firestore";
import type { Listing, Advertisement } from "@/lib/types";
import { HomePageClient } from "@/components/home-page-client";

export default async function Home() {
  const featuredListings: Listing[] = await getListings({ limit: 4 });
  const activeAdvertisements: Advertisement[] = await getAdvertisements({ activeOnly: true });

  return (
    <HomePageClient 
      featuredListings={featuredListings} 
      activeAdvertisements={activeAdvertisements} 
    />
  );
}
