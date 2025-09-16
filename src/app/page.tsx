import Link from "next/link";
import {
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="relative rounded-lg overflow-hidden mb-8">
        <Image 
          src="https://picsum.photos/seed/hero/1200/400"
          alt="Marketplace items"
          width={1200}
          height={400}
          className="w-full h-auto object-cover"
          data-ai-hint="marketplace items"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white p-4">
          <div className="mb-4 bg-background/20 backdrop-blur-sm p-3 rounded-full">
            <Package className="h-10 w-10 text-white"/>
          </div>
          <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">
            Everything You Need, <br /> All in One Place
          </h1>
          <p className="mt-4 text-lg max-w-2xl">
            Shop products, book services, find rides, discover properties, and much more. Your complete marketplace solution powered by Sokko Sasa.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-8 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        <div className="text-white">
          <div className="flex gap-2 mb-4">
            <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">PRODUCT</span>
            <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">Automotive</span>
          </div>
          <h2 className="text-5xl font-bold mb-2">Spectra Fuel Tank GM51C</h2>
          <p className="text-lg mb-6">
            Innovative engineering, manufacturing technology and quality control ensure that Spectra Premium fuel tanks meet or exce...
          </p>
          <p className="text-4xl font-extrabold mb-8">KSh 17,030</p>
          <div className="flex gap-4">
            <Button size="lg" variant="secondary" className="bg-white text-orange-600 hover:bg-gray-100">Explore Now &rarr;</Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">More Ads</Button>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src="https://picsum.photos/seed/fueltank/500/500"
            alt="Spectra Fuel Tank"
            width={500}
            height={500}
            className="rounded-lg object-cover"
            data-ai-hint="fuel tank"
          />
        </div>
      </div>
    </div>
  );
}
