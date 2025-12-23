"use client";

import Link from "next/link";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Menu, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { CartSheet } from "@/components/cart/cart-sheet";

const routes = [
    { href: "/", label: "Inicio" },
    { href: "/productos", label: "Catálogo" },
    { href: "/nosotros", label: "Nosotros" },
    { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">

                {/* Mobile Menu */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Menú</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetTitle className="sr-only">Menú de Navegación</SheetTitle>
                        <nav className="flex flex-col gap-4 mt-6">
                            <Link href="/" className="font-bold text-lg mb-2">MORANDO</Link>
                            {routes.map((route) => (
                                <Link
                                    key={route.href}
                                    href={route.href}
                                    className="block px-2 py-1 text-lg font-medium transition-colors hover:text-primary"
                                >
                                    {route.label}
                                </Link>
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="mr-6 flex items-center space-x-2 font-bold text-xl tracking-tight">
                        <span className="text-primary font-serif">MORANDO</span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                        {routes.map((route) => (
                            <Link
                                key={route.href}
                                href={route.href}
                                className="transition-colors hover:text-primary text-foreground/80"
                            >
                                {route.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <CartSheet />

                    <SignedOut>
                        <SignInButton mode="modal">
                            <Button variant="ghost" size="icon" aria-label="Iniciar Sesión">
                                <User className="h-5 w-5" />
                            </Button>
                        </SignInButton>
                    </SignedOut>

                    <SignedIn>
                        <Link href="/mis-compras">
                            <Button variant="ghost" size="sm" className="hidden md:flex">
                                Mis Compras
                            </Button>
                        </Link>
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "h-9 w-9"
                                }
                            }}
                        />
                    </SignedIn>
                </div>
            </div>
        </header>
    );
}
