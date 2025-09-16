"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, PlusCircle, X, Search, MessageSquare, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SokkoSasaLogo } from "@/components/icons";

const navLinks = [
  { href: "/", label: "Browse", icon: Search },
  { href: "/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin", label: "Admin", icon: UserIcon },
];

export function AppHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <SokkoSasaLogo className="h-7 w-7 text-primary" />
            <span className="font-headline text-xl font-bold tracking-tight">
              Sokko Sasa
            </span>
          </Link>
          <nav className="hidden items-center gap-4 md:flex">
            {navLinks.map((link) => (
              <Button key={link.href} variant="ghost" asChild>
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="outline" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild className="bg-accent hover:bg-accent/90">
            <Link href="/signup">Sign Up</Link>
          </Button>
          <Button asChild>
            <Link href="/create-listing">
              <PlusCircle className="mr-2 h-4 w-4" />
              Post Ad
            </Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-card">
              <div className="flex h-full flex-col">
                <div className="mb-6 flex items-center justify-between border-b pb-4">
                  <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                    <SokkoSasaLogo className="h-7 w-7 text-primary" />
                    <span className="font-headline text-xl font-bold">
                      Sokko Sasa
                    </span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                <nav className="flex flex-1 flex-col gap-4">
                  {navLinks.map((link) => (
                    <Button
                      key={link.href}
                      variant="ghost"
                      className="justify-start text-lg"
                      asChild
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Link href={link.href}>
                        <link.icon className="mr-3 h-5 w-5" />
                        {link.label}
                      </Link>
                    </Button>
                  ))}
                </nav>
                <div className="mt-auto flex flex-col gap-2 border-t pt-4">
                   <Button asChild size="lg" onClick={() => setIsMobileMenuOpen(false)}>
                     <Link href="/create-listing">
                       <PlusCircle className="mr-2 h-5 w-5" />
                       Post Ad
                     </Link>
                   </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" asChild size="lg" onClick={() => setIsMobileMenuOpen(false)}>
                      <Link href="/login">Log In</Link>
                    </Button>
                    <Button asChild size="lg" className="bg-accent hover:bg-accent/90" onClick={() => setIsMobileMenuOpen(false)}>
                      <Link href="/signup">Sign Up</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
