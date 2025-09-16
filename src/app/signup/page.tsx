
"use client";

import Link from "next/link";
import { Mail, Lock, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { addUserData } from "@/lib/firestore";

export default function SignupPage() {
  const { signup, loginWithGoogle } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
        setError("You must accept the terms and conditions.");
        return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const userCredential = await signup(email, password);
      if (userCredential && userCredential.user) {
        await addUserData(userCredential.user, { name });
        toast({
          title: "Account Created!",
          description: "You have been successfully signed up.",
        });
        router.push("/");
      } else {
        throw new Error("Signup failed, user not created.");
      }
    } catch (err: any) {
      setError(err.message);
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: err.code === 'auth/email-already-in-use' ? 'This email is already registered.' : err.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsGoogleLoading(true);
    try {
        await loginWithGoogle();
        toast({
            title: "Account Created!",
            description: "You have been successfully signed up with Google.",
        });
        router.push('/');
    } catch (error: any) {
        toast({
            variant: "destructive",
            title: "Google Sign-up Failed",
            description: "Could not sign up with Google. Please try again.",
        });
    } finally {
        setIsGoogleLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4 bg-muted/20">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl font-bold text-primary">
            Create an Account
          </CardTitle>
          <CardDescription>
            Join Sokko Sasa today to start buying and selling.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="Jina Lako"
                  required
                  className="pl-10"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  required
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
             <div className="flex items-center space-x-2">
              <Checkbox id="terms" checked={termsAccepted} onCheckedChange={(checked) => setTermsAccepted(checked as boolean)} />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the <Link href="#" className="text-primary hover:underline">terms and conditions</Link>
              </label>
            </div>
             {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full font-bold text-base bg-accent hover:bg-accent/90" size="lg" disabled={isLoading || isGoogleLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign Up
            </Button>
          </form>
           <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or sign up with</span>
            </div>
          </div>
           <div className="grid grid-cols-1 gap-4">
            <Button variant="outline" onClick={handleGoogleSignup} disabled={isGoogleLoading || isLoading}>
                {isGoogleLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Google
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Button variant="link" asChild className="p-0 text-primary">
              <Link href="/login">Log in</Link>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
