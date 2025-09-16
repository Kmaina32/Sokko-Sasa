
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, LocateFixed, Car, Users, ChevronsUpDown } from "lucide-react";
import { Map } from "@/components/map";


export default function RidesPage() {
    return (
        <div className="relative h-[calc(100vh-4rem)] w-full">
            <Map />
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none"></div>
            
            <div className="absolute inset-x-0 bottom-0 p-4 md:top-8 md:left-8 md:right-auto md:bottom-auto md:p-0">
                 <Collapsible defaultOpen={true} className="max-w-md mx-auto md:mx-0">
                     <Card>
                        <CollapsibleTrigger className="w-full">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="font-headline text-2xl font-bold text-left">Book a Ride</CardTitle>
                                    <CardDescription className="text-left">Quick, reliable, and at your fingertips.</CardDescription>
                                </div>
                                 <ChevronsUpDown className="h-6 w-6 text-muted-foreground" />
                            </CardHeader>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <CardContent className="space-y-4">
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
                                 <div className="pt-2">
                                    <h4 className="mb-2 font-medium">Choose Your Ride</h4>
                                     <div className="grid grid-cols-3 gap-2 text-center">
                                        <button className="flex flex-col items-center p-3 rounded-lg border-2 border-primary bg-primary/10">
                                            <Car className="h-8 w-8 text-primary mb-1"/>
                                            <p className="font-bold text-sm">SokkoGo</p>
                                            <p className="text-xs text-muted-foreground">KSh 350</p>
                                        </button>
                                        <button className="flex flex-col items-center p-3 rounded-lg border hover:border-primary">
                                            <Users className="h-8 w-8 text-foreground mb-1"/>
                                            <p className="font-bold text-sm">SokkoXL</p>
                                            <p className="text-xs text-muted-foreground">KSh 500</p>
                                        </button>
                                        <button className="flex flex-col items-center p-3 rounded-lg border hover:border-primary">
                                            <div className="h-8 w-8 mb-1 flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1 .4-1 1v7c0 .6.4 1 1 1h2"/><path d="M7 17v-5"/><path d="M12 17v-5"/><path d="M5 17H3c-.6 0-1-.4-1-1v-4c0-.6.4-1 1-1h2"/></svg>
                                            </div>
                                            <p className="font-bold text-sm">Boda</p>
                                            <p className="text-xs text-muted-foreground">KSh 150</p>
                                        </button>
                                    </div>
                                 </div>
                                <Button size="lg" className="w-full text-base font-bold">Find a Ride</Button>
                            </CardContent>
                        </CollapsibleContent>
                    </Card>
                </Collapsible>
            </div>
        </div>
    );
}
