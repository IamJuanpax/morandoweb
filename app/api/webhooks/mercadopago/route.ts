import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { sendOrderConfirmationEmail } from "@/lib/mail";

// Webhook para recibir notificaciones de Mercado Pago
export async function POST(request: Request) {
    const body = await request.json();
    const { type, data } = body;

    // Solo nos interesa cuando se crea o actualiza un pago
    if (type === "payment") {
        try {
            const paymentId = data.id;

            // Verificar estado en MP (Simulado si no hay acceso real en este momento)
            let isApproved = false;
            let orderId = null;

            if (process.env.MP_ACCESS_TOKEN) {
                const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
                    headers: { "Authorization": `Bearer ${process.env.MP_ACCESS_TOKEN}` }
                });
                if (response.ok) {
                    const paymentData = await response.json();
                    if (paymentData.status === "approved") {
                        isApproved = true;
                        orderId = paymentData.external_reference;
                    }
                }
            } else {
                // Fallback para pruebas locales si se dispara manualmente
                console.log("⚠️ Webhook sin validación MP (Token faltante)");
                // return NextResponse.json({ status: "ignored" }); 
            }

            // Nota: Si estás probando en local sin ngrok, este webhook no será llamado por MP.
            // Esta lógica es para cuando despliegues o uses un túnel.

            if (isApproved && orderId) {
                // 1. Actualizar Orden
                const order = await prisma.order.update({
                    where: { id: orderId },
                    data: { status: "paid" },
                    include: {
                        user: true,
                        items: {
                            include: { product: true }
                        }
                    }
                });
                console.log(`✅ Orden ${orderId} marcada como pagada.`);

                // 2. Enviar Email
                if (order.user.email) {
                    await sendOrderConfirmationEmail({
                        email: order.user.email,
                        orderId: order.id,
                        total: Number(order.total),
                        userName: order.user.name || "Cliente",
                        items: order.items.map(item => ({
                            name: item.product.name,
                            quantity: item.quantity,
                            price: Number(item.price),
                            image: item.product.images[0]
                        }))
                    });
                }
            }

        } catch (error) {
            console.error("Webhook processing error:", error);
            return NextResponse.json({ status: "error" }, { status: 500 });
        }
    }

    return NextResponse.json({ status: "ok" });
}
