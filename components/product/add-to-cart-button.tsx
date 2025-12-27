"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { Product } from "@/lib/mock-data";
import { toast } from "sonner";
import { MouseEvent } from "react";

interface AddToCartButtonProps {
    product: Product;
    variant?: "default" | "secondary" | "outline" | "ghost";
    size?: "default" | "sm" | "lg" | "icon";
    showText?: boolean;
}

export function AddToCartButton({ product, variant = "secondary", size = "sm", showText = true }: AddToCartButtonProps) {
    const { addItem, openCart } = useCartStore();

    const handleAddToCart = (e: MouseEvent) => {
        e.preventDefault(); // Prevent navigating to product detail if inside a Link
        e.stopPropagation();

        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
            maxStock: 50 // Mock default
        });

        toast.success("Producto agregado", {
            description: product.name,
            action: {
                label: "Ver Carrito",
                onClick: () => openCart()
            }
        });

        openCart();
    };

    return (
        <Button size={size} variant={variant} className="gap-2" onClick={handleAddToCart}>
            <ShoppingCart className="h-4 w-4" />
            {showText && <span className="sr-only lg:not-sr-only lg:inline">Agregar</span>}
        </Button>
    );
}
