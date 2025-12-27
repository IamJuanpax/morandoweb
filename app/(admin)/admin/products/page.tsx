
import Link from "next/link";
import Image from "next/image";
import { getProducts, toggleProductStatus, deleteProduct } from "@/app/actions/products";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProductActions } from "@/components/admin/product-actions";

export default async function AdminProductsPage() {
    const products = await getProducts();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Productos</h1>
                    <p className="text-muted-foreground">Gestiona tu catálogo de aceitunas y conservas.</p>
                </div>
                <Link href="/admin/products/new">
                    <Button className="gap-2 bg-yellow-600 hover:bg-yellow-700 text-white">
                        <Plus className="h-4 w-4" />
                        Nuevo Producto
                    </Button>
                </Link>
            </div>

            <div className="rounded-md border bg-card">
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm text-left">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Imagen</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Nombre</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Categoría</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Precio</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Stock</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground">Estado</th>
                                <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="p-8 text-center text-muted-foreground">
                                        No hay productos registrados.
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product.id} className="border-b transition-colors hover:bg-muted/50">
                                        <td className="p-4 align-middle">
                                            <div className="relative h-12 w-12 overflow-hidden rounded-md border bg-muted">
                                                {product.images?.[0] ? (
                                                    /* eslint-disable-next-line @next/next/no-img-element */
                                                    <img
                                                        src={product.images[0]}
                                                        alt={product.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                                                        N/A
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4 align-middle font-medium">{product.name}</td>
                                        <td className="p-4 align-middle">
                                            <Badge variant="outline">{product.category.name}</Badge>
                                        </td>
                                        <td className="p-4 align-middle">
                                            ${Number(product.price).toFixed(2)}
                                        </td>
                                        <td className="p-4 align-middle">
                                            {product.stock} u.
                                        </td>
                                        <td className="p-4 align-middle">
                                            <Badge variant={product.isAvailable ? "default" : "destructive"}>
                                                {product.isAvailable ? "Activo" : "Inactivo"}
                                            </Badge>
                                        </td>
                                        <td className="p-4 align-middle text-right">
                                            <ProductActions id={product.id} isAvailable={product.isAvailable} />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
