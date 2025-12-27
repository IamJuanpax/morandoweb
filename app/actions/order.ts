
"use server";

import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import MercadoPagoConfig, { Preference } from "mercadopago";

// Inicializar cliente de Mercado Pago
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN || '' });

interface CartItemInput {
    id: string;
    quantity: number;
}

export async function createOrder(cartItems: CartItemInput[]) {
    const { userId } = await auth();

    if (!userId) {
        return { success: false, message: "Debes iniciar sesión para realizar una compra" };
    }

    // Verificar si el usuario existe en nuestra BD
    const user = await prisma.user.findUnique({
        where: { clerkId: userId },
    });

    if (!user) {
        return { success: false, message: "Error de cuenta: Usuario no sincronizado." };
    }

    let total = 0;
    const orderItemsData = [];
    const mpItems = [];

    // Validar productos y calcular total
    for (const item of cartItems) {
        const product = await prisma.product.findUnique({ where: { id: item.id } });

        if (!product) continue;

        const price = Number(product.price);
        total += price * item.quantity;

        orderItemsData.push({
            productId: product.id,
            quantity: item.quantity,
            price: product.price
        });

        // Items formato Mercado Pago
        mpItems.push({
            id: product.id,
            title: product.name,
            quantity: item.quantity,
            unit_price: price,
            currency_id: 'ARS',
            picture_url: product.images[0] || '', // Opcional
        });
    }

    if (orderItemsData.length === 0) {
        return { success: false, message: "El carrito está vacío o contiene productos no válidos." };
    }

    try {
        // 1. Crear la Orden en Base de Datos (Pending)
        const order = await prisma.order.create({
            data: {
                userId: user.id,
                total: total,
                status: "pending",
                items: {
                    create: orderItemsData
                }
            }
        });

        // 2. Crear Preferencia de Mercado Pago
        if (!process.env.MP_ACCESS_TOKEN) {
            console.warn("MP_ACCESS_TOKEN no configurado. Se crea la orden pero no el checkout.");
            return { success: true, orderId: order.id, url: null };
        }

        const preference = new Preference(client);
        const response = await preference.create({
            body: {
                items: mpItems,
                metadata: {
                    orderId: order.id, // Metadata para el webhook
                },
                external_reference: order.id,
                back_urls: {
                    success: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout/success?orderId=${order.id}`,
                    failure: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout?error=payment_failed`,
                    pending: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/checkout?status=pending`,
                },
                auto_return: "approved",
            }
        });

        revalidatePath("/mis-compras");

        // Retornar la URL de pago
        return { success: true, orderId: order.id, url: response.init_point };

    } catch (error) {
        console.error("Error creating order/preference:", error);
        return { success: false, message: "Error interno al procesar el pago." };
    }
}
