import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { AddToCart } from "@/components/product/add-to-cart";
import { ShieldCheck, Truck } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

// Permitir parámetros dinámicos en versiones recientes de Next
type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
    const { slug } = await params
    const product = MOCK_PRODUCTS.find((p) => p.slug === slug);
    if (!product) return { title: "Producto no encontrado" };

    return {
        title: product.name,
        description: product.description,
    };
}

export default async function ProductPage({ params }: Props) {
    const { slug } = await params
    const product = MOCK_PRODUCTS.find((p) => p.slug === slug);

    if (!product) {
        notFound();
    }

    return (
        <div className="container py-10 md:py-16">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-16">

                {/* Gallery Column */}
                <div className="relative aspect-square w-full overflow-hidden rounded-xl border bg-secondary/20 flex items-center justify-center">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Info Column */}
                <div className="flex flex-col gap-6">
                    <div>
                        <h3 className="text-lg font-medium text-primary mb-2">{product.category}</h3>
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{product.name}</h1>
                    </div>

                    <div className="text-3xl font-bold">
                        ${product.price.toLocaleString("es-AR")}
                    </div>

                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {product.description}
                    </p>

                    <div className="flex flex-col gap-4 pt-4 border-t">
                        {/* Especificaciones Dummy (Simulando JSON) */}
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex flex-col">
                                <span className="text-muted-foreground">Origen</span>
                                <span className="font-medium">Mendoza, Argentina</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-muted-foreground">Variedad</span>
                                <span className="font-medium">Arauco / Manzanilla</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-muted-foreground">Presentación</span>
                                <span className="font-medium">Frasco / Doypack</span>
                            </div>
                        </div>
                    </div>

                    {/* Add To Cart Section */}
                    <AddToCart product={product} />

                    <div className="mt-6 grid gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-3">
                            <Truck className="h-5 w-5 text-primary" />
                            <span>Envíos a todo el país. Gratis en compras superiores a $50.000</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="h-5 w-5 text-primary" />
                            <span>Garantía de calidad de fábrica.</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
