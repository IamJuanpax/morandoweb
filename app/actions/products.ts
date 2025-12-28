
"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const ProductSchema = z.object({
    name: z.string().min(3),
    description: z.string().min(10),
    price: z.coerce.number().min(0),
    stock: z.coerce.number().int().min(0),
    categoryId: z.string().uuid(),
    images: z.string().url().array().optional(), // Or separate logic
    isAvailable: z.boolean().optional(),
});

export async function getProducts() {
    try {
        const products = await prisma.product.findMany({
            include: { category: true },
            orderBy: { createdAt: 'desc' }
        });
        return products;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

export async function getCategories() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { name: 'asc' }
        });
        return categories;
    } catch (error) {
        return [];
    }
}

export async function getProductById(id: string) {
    try {
        const product = await prisma.product.findUnique({
            where: { id },
            include: { category: true }
        });
        // Convert Decimal to number for component compatibility if needed, but simple passing might work if serializable.
        // Prisma Decimal is not directly serializable to Client Components usually.
        if (product) {
            return {
                ...product,
                price: Number(product.price),
                // Ensure other non-serializables are handled if any
            };
        }
        return null;
    } catch (error) {
        return null;
    }
}

export async function createProduct(formData: FormData) {
    const rawData = {
        name: formData.get("name"),
        description: formData.get("description"),
        price: formData.get("price"),
        stock: formData.get("stock"),
        categoryId: formData.get("categoryId"),
        isAvailable: formData.get("isAvailable") === "on",
    };

    // Images handling: For MVP we parse comma-separated URLs or multiple fields
    // Assuming simple text input for now
    const imageUrl = formData.get("imageUrl") as string;
    const images = imageUrl ? [imageUrl] : [];

    try {
        // Validate
        const validation = ProductSchema.safeParse({
            ...rawData,
            images,
        });

        if (!validation.success) {
            return { success: false, message: "Datos inválidos: " + validation.error.issues.map(e => e.message).join(", ") };
        }

        const { name, description, price, stock, categoryId, isAvailable } = validation.data;

        await prisma.product.create({
            data: {
                name,
                description,
                price,
                stock,
                categoryId,
                images,
                isAvailable: isAvailable ?? true,
                // specifications: {} // Todo: Handle specs
            }
        });

        revalidatePath("/admin/products");
        revalidatePath("/productos");

    } catch (error: any) {
        console.error("Error creating product:", error);
        return { success: false, message: "Error al crear producto: " + error.message };
    }

    redirect("/admin/products");
}

export async function updateProduct(id: string, formData: FormData) {
    const rawData = {
        name: formData.get("name"),
        description: formData.get("description"),
        price: formData.get("price"),
        stock: formData.get("stock"),
        categoryId: formData.get("categoryId"),
        isAvailable: formData.get("isAvailable") === "on",
    };

    const imageUrl = formData.get("imageUrl") as string;
    const images = imageUrl ? [imageUrl] : [];

    try {
        await prisma.product.update({
            where: { id },
            data: {
                name: rawData.name as string,
                description: rawData.description as string,
                price: Number(rawData.price),
                stock: Number(rawData.stock),
                categoryId: rawData.categoryId as string,
                images: images,
                isAvailable: rawData.isAvailable
            }
        });

        revalidatePath("/admin/products");
        revalidatePath("/productos");
        revalidatePath(`/productos/${id}`); // Validation slug/id might differ if using slug

    } catch (error: any) {
        return { success: false, message: "Error al actualizar: " + error.message };
    }

    redirect("/admin/products");
}

export async function toggleProductStatus(id: string, currentStatus: boolean) {
    try {
        await prisma.product.update({
            where: { id },
            data: { isAvailable: !currentStatus }
        });
        revalidatePath("/admin/products");
        return { success: true };
    } catch (error) {
        return { success: false, message: "Error creating product" };
    }
}

export async function deleteProduct(id: string) {
    try {
        await prisma.product.delete({
            where: { id }
        });
        revalidatePath("/admin/products");
        return { success: true };
    } catch (error) {
        return { success: false, message: "Error deleting product" };
    }
}
