
'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { CreditCard, Smartphone, Loader2 } from "lucide-react";
import Image from "next/image";
import { useAuth } from '@/context/auth-context';
import { getCartItems } from '@/lib/firestore';
import type { Listing } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';


interface CartItem extends Listing {
  quantity: number;
}

const MpesaIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
      fill="#4caf50"
    />
    <path
      d="M12.5 12.5v3.5h-1v-3.5H9v-1h2.5V8h1v3.5H15v1z"
      fill="white"
    />
  </svg>
);


const PaypalIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.522 6.002c.49-.941 1.25-1.748 2.227-2.316C6.772 3.09 7.91 2.8 9.074 2.8h5.926c3.966 0 6.425 2.126 5.56 5.92.176-.902.13-1.843-.162-2.73-.896-2.583-3.23-4.19-5.99-4.19H8.48c-3.15 0-5.836 2.05-6.632 5.097-.08.3-.146.608-.2.922h.02c.008.013.015.026.023.038.01.018.015.034.02.053a.31.31 0 01.002-.005z"
      fill="#009cde"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.962 2.802H8.48c-3.15 0-5.836 2.05-6.632 5.097-.248.918-.28 1.884-.11 2.83H6.8c.67 0 1.25.46 1.43 1.1l.88 3.23c.25.93.98 1.54 1.88 1.54h3.18c2.4 0 4.38-1.72 4.7-4.04.38-2.6-1.5-4.86-4.04-4.86h-2.87zm-1.88 7.39l-.3-1.1c-.24-.92-.97-1.53-1.88-1.53H2.84c.16-.9.58-1.72 1.17-2.37.95-1.02 2.2-1.6 3.52-1.6h2.95c2.18 0 4.02 1.5 4.38 3.6.3 1.77-1.03 3.33-2.8 3.33h-2.9c-.6 0-1.12-.4-1.28-.96z"
      fill="#003087"
    />
  </svg>
);


export default function CheckoutPage() {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const router = useRouter();


  useEffect(() => {
    if (user) {
      const unsubscribe = getCartItems(user.uid, (items) => {
        setCartItems(items as CartItem[]);
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, [user]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = cartItems.length > 0 ? 250 : 0;
  const total = subtotal + shipping;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 2,
    }).format(amount);
  };
  
  const handlePlaceOrder = () => {
    setIsProcessing(true);
    // In a real app, this would trigger the payment processing.
    // For this demo, we'll just simulate a successful order.
    setTimeout(() => {
        toast({
            title: "Order Placed!",
            description: "Your order has been successfully placed. Thank you for shopping with us!"
        });
        // Here you would typically clear the cart.
        setIsProcessing(false);
        router.push('/');
    }, 2000);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-headline text-4xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" defaultValue={user?.displayName || ''}/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Delivery Address</Label>
                  <Input id="address" placeholder="123 Biashara St, Nairobi" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" defaultValue={user?.email || ''}/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="0712 345 678" />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>
                All transactions are secure and encrypted.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="mpesa" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="mpesa">
                    <MpesaIcon />
                    <span className="ml-2">M-Pesa</span>
                  </TabsTrigger>
                  <TabsTrigger value="card">
                    <CreditCard />
                    <span className="ml-2">Card</span>
                  </TabsTrigger>
                  <TabsTrigger value="paypal">
                    <PaypalIcon />
                    <span className="ml-2">PayPal</span>
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="mpesa" className="mt-6">
                  <p className="text-muted-foreground mb-4">
                    You will receive a push notification on your phone to complete the payment.
                  </p>
                  <div className="space-y-2">
                    <Label htmlFor="mpesa-phone">M-Pesa Phone Number</Label>
                    <div className="relative">
                      <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="mpesa-phone"
                        placeholder="e.g. 0712345678"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="card" className="mt-6">
                   <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input id="card-number" placeholder="**** **** **** ****" />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2 col-span-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM / YY" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" />
                        </div>
                      </div>
                   </div>
                </TabsContent>
                <TabsContent value="paypal" className="mt-6 text-center">
                    <p className="text-muted-foreground mb-4">You will be redirected to PayPal to complete your purchase securely.</p>
                    <Button variant="outline" className="w-full">
                       Continue with PayPal
                    </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="lg:sticky lg:top-24 h-fit">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
             {loading ? (
                <div className="flex justify-center p-8">
                    <Loader2 className="w-6 h-6 animate-spin"/>
                </div>
             ) : cartItems.length > 0 ? (
                <div className="space-y-2">
                    {cartItems.map(item => (
                         <div key={item.id} className="flex items-center gap-4">
                             <Image
                                src={item.imageUrl}
                                alt={item.title}
                                width={64}
                                height={64}
                                className="rounded-md"
                                data-ai-hint={item.imageHint}
                            />
                            <div className="flex-1">
                                <p className="font-medium">{item.title}</p>
                                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
                         </div>
                    ))}
                </div>
             ) : (
                <p className="text-muted-foreground text-center p-4">Your cart is empty.</p>
             )}
              <Separator />
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{formatCurrency(shipping)}</span>
                </div>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <Button size="lg" className="w-full mt-4 font-bold text-base" onClick={handlePlaceOrder} disabled={cartItems.length === 0 || isProcessing}>
                {isProcessing && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                Pay {formatCurrency(total)}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
