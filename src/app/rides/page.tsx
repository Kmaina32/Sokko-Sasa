import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, LocateFixed, Car, Users } from "lucide-react";
import Image from "next/image";

export default function RidesPage() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 h-[calc(100vh-4rem)]">
            <div className="lg:col-span-1 bg-background p-6 lg:p-8 flex flex-col border-t lg:border-t-0">
                <div className="mb-8">
                    <h1 className="font-headline text-3xl font-bold">Book a Ride</h1>
                    <p className="text-muted-foreground">Quick, reliable, and at your fingertips.</p>
                </div>
                <form className="flex-1 flex flex-col space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="pickup">Pickup Location</Label>
                        <div className="relative">
                            <LocateFixed className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input id="pickup" placeholder="Enter pickup location" className="pl-10 h-11" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="destination">Destination</Label>
                         <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input id="destination" placeholder="Enter destination" className="pl-10 h-11" />
                        </div>
                    </div>
                    <div className="flex-1"></div>
                    <Button size="lg" className="w-full text-base font-bold">Find a Ride</Button>
                </form>
            </div>
            <div className="lg:col-span-2 bg-muted/30 flex items-center justify-center relative overflow-hidden">
                <Image 
                    src="https://images.unsplash.com/photo-1593902784915-77943a13d397?q=80&w=2940&auto=format&fit=crop"
                    alt="Map of a city"
                    fill
                    className="object-cover opacity-20"
                    data-ai-hint="city map"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent"></div>
                <Card className="absolute bottom-8 left-8 right-8 shadow-lg">
                    <CardHeader>
                        <CardTitle>Choose Your Ride</CardTitle>
                        <CardDescription>Select a ride that suits your needs.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-3 gap-4 text-center">
                         <button className="flex flex-col items-center p-3 rounded-lg border-2 border-primary bg-primary/10">
                            <Car className="h-8 w-8 text-primary mb-2"/>
                            <p className="font-bold">SokkoGo</p>
                            <p className="text-sm text-muted-foreground">KSh 350</p>
                        </button>
                         <button className="flex flex-col items-center p-3 rounded-lg border hover:border-primary">
                            <Users className="h-8 w-8 text-foreground mb-2"/>
                            <p className="font-bold">SokkoXL</p>
                            <p className="text-sm text-muted-foreground">KSh 500</p>
                        </button>
                         <button className="flex flex-col items-center p-3 rounded-lg border hover:border-primary">
                             <div className="h-8 w-8 mb-2 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h2"/><path d="M7 17v-5"/><path d="M12 17v-5"/><path d="M5 17H3c-.6 0-1-.4-1-1v-4c0-.6.4-1 1-1h2"/></svg>
                             </div>
                            <p className="font-bold">Boda</p>
                            <p className="text-sm text-muted-foreground">KSh 150</p>
                        </button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
