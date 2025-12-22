import Link from "next/link";
import { Product } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="group relative flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
            <Link href={`/productos/${product.slug}`} className="aspect-square relative overflow-hidden bg-muted/20">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-secondary">
                    {/* Placeholder until we have real images */}
                    <span className="text-4xl">🫒</span>
                </div>
                {/* Usamos un div como placeholder si no hay imagen real, en producción usar next/image con fallback */}
                {/* <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        /> */}
            </Link>
            <div className="flex flex-col flex-1 p-4">
                <div className="mb-2">
                    <h3 className="font-semibold text-lg tracking-tight line-clamp-1 group-hover:text-primary transition-colors">
                        <Link href={`/productos/${product.slug}`}>
                            {product.name}
                        </Link>
                    </h3>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                </div>
                <div className="mt-auto flex items-center justify-between">
                    <span className="text-lg font-bold">
                        ${product.price.toLocaleString("es-AR")}
                    </span>
                    <Button size="sm" variant="secondary" className="gap-2">
                        <ShoppingCart className="h-4 w-4" />
                        <span className="sr-only lg:not-sr-only lg:inline">Agregar</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
