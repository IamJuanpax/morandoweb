"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { toast } from "sonner";
import { Product } from "@/lib/mock-data";

interface AddToCartProps {
    product: Product;
}

export function AddToCart({ product }: AddToCartProps) {
    const [quantity, setQuantity] = useState(1);
    const { addItem, openCart } = useCartStore();

    const handleAddItem = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity,
            maxStock: 50 // Hardcoded for now as mock data doesn't have stock
        });

        toast.success("Producto agregado al carrito", {
            description: `${quantity}x ${product.name}`,
            action: {
                label: "Ver Carrito",
                onClick: () => openCart()
            }
        });

        openCart();
    };

    const increment = () => {
        setQuantity(prev => Math.min(prev + 1, 50));
    };

    const decrement = () => {
        setQuantity(prev => Math.max(prev - 1, 1));
    };

    return (
        <div className="flex flex-col gap-4 sm:flex-row mt-6">
            <div className="flex items-center border border-neutral-200 dark:border-neutral-800 rounded-md w-fit bg-background">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-none hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    onClick={decrement}
                    disabled={quantity <= 1}
                >
                    <Minus className="h-4 w-4" />
                </Button>
                <div className="w-12 text-center font-medium">
                    {quantity}
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-none hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    onClick={increment}
                    disabled={quantity >= 50}
                >
                    <Plus className="h-4 w-4" />
                </Button>
            </div>

            <Button
                size="lg"
                className="flex-1 gap-2 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all active:scale-95"
                onClick={handleAddItem}
            >
                <ShoppingCart className="h-5 w-5" />
                Agregar al Carrito
            </Button>
        </div>
    );
}
