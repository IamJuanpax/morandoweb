
"use server";

import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface CartItemInput {
    id: string;
    quantity: number;
}

export async function createOrder(cartItems: CartItemInput[]) {
    const { userId } = await auth();

    if (!userId) {
        return { success: false, message: "Debes iniciar sesión para realizar una compra" };
    }

    // Verificar si el usuario existe en nuestra BD (sincronizado desde Clerk)
    const user = await prisma.user.findUnique({
        where: { clerkId: userId },
    });

    if (!user) {
        // En un caso real, aquí podríamos intentar crear el usuario si no existe,
        // o lanzar un error pidiendo que complete su perfil.
        return { success: false, message: "Error de cuenta: Usuario no sincronizado." };
    }

    let total = 0;
    const orderItemsData = [];

    // Validar stock y calcular total real desde el servidor
    for (const item of cartItems) {
        const product = await prisma.product.findUnique({ where: { id: item.id } });

        if (!product) {
            // Producto no existe o fue eliminado
            continue;
        }

        // Aquí podríamos verificar stock: if (product.stock < item.quantity) ...

        const price = Number(product.price);
        total += price * item.quantity;

        orderItemsData.push({
            productId: product.id,
            quantity: item.quantity,
            price: product.price // Guardamos el precio histórico
        });
    }

    if (orderItemsData.length === 0) {
        return { success: false, message: "El carrito está vacío o contiene productos no válidos." };
    }

    try {
        // Crear la orden
        const order = await prisma.order.create({
            data: {
                userId: user.id,
                total: total,
                status: "pending", // Simulado. En realidad sería 'pending' hasta pago.
                items: {
                    create: orderItemsData
                }
            }
        });

        // Opcional: Descontar stock aquí

        revalidatePath("/mis-compras");
        return { success: true, orderId: order.id };

    } catch (error) {
        console.error("Error creating order:", error);
        return { success: false, message: "Error interno al procesar la orden." };
    }
}
