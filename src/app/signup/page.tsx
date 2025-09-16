
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  terms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions." }),
  }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const { signup, loginWithGoogle } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      terms: false,
    },
  });

  const { formState: { isSubmitting, errors } } = form;

  const handleSignup = async (values: SignupFormValues) => {
    try {
      const userCredential = await signup(values.email, values.password);
      if (userCredential && userCredential.user) {
        await addUserData(userCredential.user, { name: values.name });
        toast({
          title: "Account Created!",
          description: "You have been successfully signed up.",
        });
        router.push("/");
        router.refresh();
      } else {
        throw new Error("Signup failed, user not created.");
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: err.code === 'auth/email-already-in-use' ? 'This email is already registered.' : "An unexpected error occurred.",
      });
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
        router.refresh();
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
          <form onSubmit={form.handleSubmit(handleSignup)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="Jina Lako"
                  required
                  className="pl-10"
                  {...form.register("name")}
                />
              </div>
              {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
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
                  {...form.register("email")}
                />
              </div>
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
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
                  {...form.register("password")}
                />
              </div>
              {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>
             <div className="flex items-center space-x-2">
              <Checkbox id="terms" {...form.register("terms")} />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the <Link href="#" className="text-primary hover:underline">terms and conditions</Link>
              </label>
            </div>
            {errors.terms && <p className="text-sm text-destructive">{errors.terms.message}</p>}
            <Button type="submit" className="w-full font-bold text-base bg-accent hover:bg-accent/90" size="lg" disabled={isSubmitting || isGoogleLoading}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
            <Button variant="outline" onClick={handleGoogleSignup} disabled={isGoogleLoading || isSubmitting}>
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
