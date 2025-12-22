import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { ProductCard } from "@/components/product/product-card";

export const metadata = {
    title: "Catálogo",
    description: "Explora nuestra selección de aceitunas y aceites premium.",
};

export default function CatalogPage() {
    return (
        <div className="container py-8 md:py-12">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-primary">Nuestros Productos</h1>
                    <p className="text-muted-foreground mt-2">
                        Selección exclusiva de la familia Morando, directo a tu mesa.
                    </p>
                </div>
                {/* Filtros podrían ir aquí */}
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {MOCK_PRODUCTS.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
