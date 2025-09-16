import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash2, Minus, Plus, ShoppingCart, ArrowLeft } from "lucide-react";
import { placeholderImages } from "@/lib/placeholder-images";
import Link from "next/link";


const cartItems = [
    {
        id: 'prod1',
        name: 'Hand-carved Wooden Elephant',
        price: 2500,
        quantity: 1,
        imageUrl: placeholderImages.product1.imageUrl,
        imageHint: placeholderImages.product1.imageHint,
    },
    {
        id: 'prod2',
        name: 'Sisal Kiondo Basket',
        price: 1200,
        quantity: 2,
        imageUrl: placeholderImages.product2.imageUrl,
        imageHint: placeholderImages.product2.imageHint,
    }
];

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 2,
    }).format(amount);
}

export default function CartPage() {
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = cartItems.length > 0 ? 250 : 0;
    const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-headline text-4xl font-bold mb-8">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card>
                <CardContent className="p-0">
                    {cartItems.length > 0 ? (
                        <div className="divide-y divide-border">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex items-center gap-4 p-4">
                                    <Image 
                                        src={item.imageUrl}
                                        alt={item.name}
                                        width={100}
                                        height={100}
                                        className="rounded-md object-cover"
                                        data-ai-hint={item.imageHint}
                                    />
                                    <div className="flex-1">
                                        <p className="font-semibold">{item.name}</p>
                                        <p className="text-muted-foreground">{formatCurrency(item.price)}</p>
                                    </div>
                                    <div className="flex items-center gap-2 border rounded-md p-1">
                                        <Button variant="ghost" size="icon" className="h-6 w-6">
                                            <Minus className="w-4 h-4"/>
                                        </Button>
                                        <span className="w-8 text-center font-bold">{item.quantity}</span>
                                        <Button variant="ghost" size="icon" className="h-6 w-6">
                                            <Plus className="w-4 h-4"/>
                                        </Button>
                                    </div>
                                    <p className="font-bold w-24 text-right">{formatCurrency(item.price * item.quantity)}</p>
                                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                                        <Trash2 className="w-5 h-5"/>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    ) : (
                         <div className="flex flex-col items-center justify-center p-16 text-center">
                            <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
                            <h3 className="text-xl font-semibold">Your cart is empty</h3>
                            <p className="text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
                             <Button asChild className="mt-6">
                                <Link href="/shop">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Continue Shopping
                                </Link>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1">
            <Card className="sticky top-24">
                <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="font-medium">{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Shipping</span>
                        <span className="font-medium">{formatCurrency(shipping)}</span>
                    </div>
                     <div className="flex items-center space-x-2">
                        <Input placeholder="Discount code" disabled={cartItems.length === 0} />
                        <Button variant="outline" disabled={cartItems.length === 0}>Apply</Button>
                    </div>
                    <Separator />
                     <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>{formatCurrency(total)}</span>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button size="lg" className="w-full" disabled={cartItems.length === 0}>
                        Proceed to Checkout
                    </Button>
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}
