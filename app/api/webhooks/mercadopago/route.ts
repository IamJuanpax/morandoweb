
import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/db";

// Webhook para recibir notificaciones de Mercado Pago
export async function POST(request: Request) {
    // Validar firma de seguridad (opcional pero recomendado)
    // const signature = request.headers.get("x-signature");
    // const requestId = request.headers.get("x-request-id");

    const body = await request.json();
    const { type, data } = body;

    // Solo nos interesa cuando se crea o actualiza un pago
    if (type === "payment") {
        try {
            // Consultar el estado del pago a la API de MP usando el ID
            // Nota: Por seguridad, deberíamos llamar a MP para verificar el estado real y no confiar solo en el body.
            // Para simplificar este MVP, asumiremos que si llega aquí, verificamos el estado usando fetch a MP.

            const paymentId = data.id;

            const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
                headers: {
                    "Authorization": `Bearer ${process.env.MP_ACCESS_TOKEN}`
                }
            });

            if (!response.ok) {
                console.error("Error fetching payment from MP");
                return NextResponse.json({ status: "error" }, { status: 500 });
            }

            const paymentData = await response.json();

            // "approved" es el estado de éxito
            if (paymentData.status === "approved") {
                const orderId = paymentData.external_reference;

                if (orderId) {
                    await prisma.order.update({
                        where: { id: orderId },
                        data: { status: "paid" }
                    });
                    console.log(`Orden ${orderId} marcada como pagada.`);
                }
            }

        } catch (error) {
            console.error("Webhook processing error:", error);
            return NextResponse.json({ status: "error" }, { status: 500 });
        }
    }

    return NextResponse.json({ status: "ok" });
}
