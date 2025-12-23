
"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem, useCartStore } from "@/lib/store/cart";

interface CartItemProps {
    item: CartItem;
}

export function CartItemRow({ item }: CartItemProps) {
    const { updateQuantity, removeItem } = useCartStore();

    return (
        <div className="flex items-center gap-4 py-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-800">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex flex-1 flex-col">
                <span className="font-medium text-sm text-neutral-900 dark:text-neutral-100">
                    {item.name}
                </span>
                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                    ${item.price.toFixed(2)}
                </span>
            </div>
            <div className="flex items-center gap-2">
                <div className="flex items-center rounded-md border border-neutral-200 dark:border-neutral-800">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-none"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                    >
                        <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-none"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.maxStock}
                    >
                        <Plus className="h-3 w-3" />
                    </Button>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                    onClick={() => removeItem(item.id)}
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
