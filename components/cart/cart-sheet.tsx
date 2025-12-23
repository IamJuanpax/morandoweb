
"use client";

import { ShoppingCart } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart";
import { CartItemRow } from "./cart-item";
import Link from "next/link";
import { useEffect, useState } from "react";

export function CartSheet() {
    const { items, total, removeItem, updateQuantity, isCartOpen, openCart, closeCart } = useCartStore();
    const [mounted, setMounted] = useState(false);

    // Hydration fix for persist middleware
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <Sheet open={isCartOpen} onOpenChange={(open) => open ? openCart() : closeCart()}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative" onClick={openCart}>
                    <ShoppingCart className="h-5 w-5" />
                    {items.length > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-500 text-[10px] font-bold text-black">
                            {items.length}
                        </span>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="flex w-full flex-col sm:max-w-md">
                <SheetHeader>
                    <SheetTitle>Tu Carrito ({items.length})</SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto py-4">
                    {items.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center space-y-2 text-neutral-500">
                            <ShoppingCart className="h-12 w-12 opacity-20" />
                            <p>El carrito está vacío</p>
                            <SheetClose asChild>
                                <Button variant="link" className="text-yellow-600">Ver Productos</Button>
                            </SheetClose>
                        </div>
                    ) : (
                        <div className="flex flex-col divide-y divide-neutral-100 dark:divide-neutral-800">
                            {items.map((item) => (
                                <CartItemRow key={item.id} item={item} />
                            ))}
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="space-y-4 border-t border-neutral-200 pt-4 dark:border-neutral-800">
                        <div className="flex items-center justify-between text-base font-medium">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <div className="grid gap-2">
                            <SheetClose asChild>
                                <Link href="/checkout">
                                    <Button className="w-full bg-yellow-500 text-black hover:bg-yellow-400">
                                        Iniciar Compra
                                    </Button>
                                </Link>
                            </SheetClose>
                            <SheetClose asChild>
                                <Button variant="outline" className="w-full">
                                    Seguir comprando
                                </Button>
                            </SheetClose>
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
