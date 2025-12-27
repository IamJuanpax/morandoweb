"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store/cart";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

function SuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { clearCart } = useCartStore();
    const orderId = searchParams.get("orderId");

    // Si viene con payment_id de MP, asumimos éxito y limpiamos carrito
    const paymentId = searchParams.get("payment_id");
    const status = searchParams.get("status");

    useEffect(() => {
        if (status === 'approved' || orderId) {
            clearCart();
            // Evitar loop de toast si el usuario recarga
            const hasToasted = sessionStorage.getItem(`toasted_order_${orderId}`);
            if (!hasToasted) {
                toast.success("¡Pago exitoso!", {
                    description: "Tu pedido ha sido confirmado."
                });
                if (orderId) sessionStorage.setItem(`toasted_order_${orderId}`, "true");
            }
        }
    }, [status, orderId, clearCart]);

    return (
        <div className="container flex flex-col items-center justify-center min-h-[60vh] py-12 text-center">
            <div className="bg-green-100 dark:bg-green-900/30 p-6 rounded-full mb-6 animate-in zoom-in duration-300">
                <CheckCircle className="h-16 w-16 text-green-600 dark:text-green-400" />
            </div>

            <h1 className="text-4xl font-bold font-serif mb-4">¡Gracias por tu compra!</h1>

            <p className="text-lg text-muted-foreground max-w-md mb-8">
                Hemos recibido tu pedido correctamente. Te enviaremos un email con los detalles de envío en breve.
            </p>

            {orderId && (
                <div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 mb-8">
                    <p className="text-sm text-neutral-500 uppercase tracking-wider font-semibold">Número de Orden</p>
                    <p className="text-xl font-mono mt-1 select-all">{orderId}</p>
                </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/mis-compras">
                    <Button size="lg" className="w-full sm:w-auto bg-yellow-600 hover:bg-yellow-700 text-white">
                        Ver Mis Compras
                    </Button>
                </Link>
                <Link href="/">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                        <ArrowRight className="mr-2 h-4 w-4" />
                        Volver al Inicio
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default function CheckoutSuccessPage() {
    return (
        <Suspense fallback={<div>Cargando resultado...</div>}>
            <SuccessContent />
        </Suspense>
    );
}
