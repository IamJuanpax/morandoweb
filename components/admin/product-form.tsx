
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct, updateProduct } from "@/app/actions/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Category {
    id: string;
    name: string;
}

interface ProductFormProps {
    categories: Category[];
    product?: {
        id: string;
        name: string;
        description: string;
        price: number;
        stock: number;
        categoryId: string;
        images: string[];
        isAvailable: boolean;
    };
}

export function ProductForm({ categories, product }: ProductFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const isEditing = !!product;

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        let result;

        if (isEditing && product) {
            result = await updateProduct(product.id, formData);
        } else {
            result = await createProduct(formData);
        }

        if (result && !result.success) {
            toast.error(result.message);
            setLoading(false);
        } else {
            // Success is handled by redirect in server action mostly, but if we return:
            toast.success(isEditing ? "Producto actualizado" : "Producto creado");
            // Router redirect handled by server action usually, but we can double check
            if (!result) {
                // If void (redirect), this might not execute fully or component unmounts
            }
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6 flex items-center gap-4">
                <Link href="/admin/products">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold">{isEditing ? "Editar Producto" : "Nuevo Producto"}</h1>
            </div>

            <form action={handleSubmit} className="space-y-6 bg-card p-6 rounded-lg border shadow-sm">
                <div className="space-y-2">
                    <Label htmlFor="name">Nombre del Producto</Label>
                    <Input
                        id="name"
                        name="name"
                        placeholder="Aceitunas Negras Premium"
                        defaultValue={product?.name}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea
                        id="description"
                        name="description"
                        placeholder="Descripción detallada..."
                        defaultValue={product?.description}
                        required
                        className="min-h-[100px]"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="price">Precio ($)</Label>
                        <Input
                            id="price"
                            name="price"
                            type="number"
                            min="0"
                            step="0.01"
                            defaultValue={product?.price}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="stock">Stock</Label>
                        <Input
                            id="stock"
                            name="stock"
                            type="number"
                            min="0"
                            defaultValue={product?.stock}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="categoryId">Categoría</Label>
                    <select
                        id="categoryId"
                        name="categoryId"
                        defaultValue={product?.categoryId}
                        required
                        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <option value="">Seleccionar Categoría...</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="imageUrl">URL de Imagen Principal</Label>
                    <Input
                        id="imageUrl"
                        name="imageUrl"
                        placeholder="https://ejemplo.com/imagen.jpg"
                        defaultValue={product?.images?.[0]}
                    />
                    <p className="text-xs text-muted-foreground">Nota: Por ahora usar URLs extenas (ej. Unsplash, Cloudinary).</p>
                </div>

                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="isAvailable"
                        name="isAvailable"
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked={product ? product.isAvailable : true}
                    />
                    <Label htmlFor="isAvailable">Producto Activo / Disponible</Label>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isEditing ? "Guardar Cambios" : "Crear Producto"}
                </Button>
            </form>
        </div>
    );
}
