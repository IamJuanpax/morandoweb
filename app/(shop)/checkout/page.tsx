
"use client";

import { useCartStore } from "@/lib/store/cart";
import { Button } from "@/components/ui/button";
import { createOrder } from "@/app/actions/order";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Loader2, ArrowRight, ShieldCheck, CreditCard } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CheckoutPage() {
    const { items, total, clearCart } = useCartStore();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleCheckout = async () => {
        setLoading(true);
        try {
            const result = await createOrder(items.map(i => ({ id: i.id, quantity: i.quantity })));
            if (result.success) {
                if (result.url) {
                    window.location.href = result.url; // Redirigir a Mercado Pago
                } else {
                    // Fallback para dev sin MP
                    clearCart();
                    toast.success("¡Pedido realizado! (Sin pago configurado)");
                    router.push("/mis-compras");
                }
            } else {
                toast.error(result.message || "Error al crear la orden");
            }
        } catch (error) {
            toast.error("Ocurrió un error inesperado");
        } finally {
            setLoading(false);
        }
    };

    if (!mounted) return null;

    if (items.length === 0) {
        return (
            <div className="container min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
                <h1 className="text-3xl font-bold font-serif">Tu carrito está vacío</h1>
                <p className="text-muted-foreground">Agrega algunos de nuestros productos premium para continuar.</p>
                <Link href="/productos">
                    <Button variant="outline" className="mt-4 border-yellow-600 text-yellow-600 hover:bg-yellow-50">
                        Ir al Catálogo
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container py-12 max-w-6xl">
            <h1 className="text-4xl font-bold font-serif mb-8 text-center md:text-left">Finalizar Compra</h1>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Resumen de Items */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-card border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden p-6 shadow-sm">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-md">1</span>
                            Revisión de Pedido
                        </h2>
                        <div className="space-y-4 divide-y divide-neutral-100 dark:divide-neutral-800">
                            {items.map(item => (
                                <div key={item.id} className="flex gap-4 pt-4 first:pt-0">
                                    <div className="relative h-20 w-20 flex-shrink-0 bg-neutral-100 dark:bg-neutral-800 rounded-md overflow-hidden">
                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1 flex justify-between">
                                        <div>
                                            <h3 className="font-medium">{item.name}</h3>
                                            <p className="text-sm text-neutral-500">Cant: {item.quantity}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                                            <p className="text-xs text-neutral-400">${item.price.toFixed(2)} c/u</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-card border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden p-6 shadow-sm">
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-md">2</span>
                            Método de Pago
                        </h2>

                        <div className="space-y-3">
                            {/* Opción Mercado Pago Seleccionada */}
                            {/* Opción Mercado Pago Seleccionada */}
                            <div className="p-4 border border-blue-200 bg-blue-50/50 dark:bg-blue-900/10 dark:border-blue-800 rounded-lg flex items-center justify-between cursor-pointer ring-1 ring-blue-500/50 shadow-sm">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-20 bg-white dark:bg-zinc-100 rounded flex items-center justify-center p-2 border">
                                        <Image
                                            src="https://http2.mlstatic.com/frontend-assets/mp-web-navigation/ui-navigation/5.19.5/mercadopago/logo__large.png"
                                            alt="Mercado Pago"
                                            width={80}
                                            height={30}
                                            className="object-contain"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-medium text-blue-950 dark:text-blue-50">Mercado Pago</p>
                                        <p className="text-xs text-blue-800/70 dark:text-blue-200/70">Tarjetas, Efectivo y Dinero en cuenta.</p>
                                    </div>
                                </div>
                                <div className="h-5 w-5 rounded-full border-2 border-blue-600 bg-blue-600 flex items-center justify-center">
                                    <div className="h-2 w-2 rounded-full bg-white" />
                                </div>
                            </div>

                            <p className="text-xs text-neutral-500 px-1 pt-2 flex items-center gap-2">
                                <ShieldCheck className="h-3 w-3" />
                                Serás redirigido al sitio seguro de Mercado Pago para finalizar.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Sidebar de Total */}
                <div className="md:col-span-1">
                    <div className="sticky top-24 space-y-6">
                        <div className="bg-card border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-lg">
                            <h3 className="text-lg font-bold mb-4">Resumen</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between text-neutral-500">
                                    <span>Subtotal</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-neutral-500">
                                    <span>Envío</span>
                                    <span className="text-green-600 font-medium">Gratis</span>
                                </div>
                                <div className="border-t border-neutral-100 dark:border-neutral-800 pt-2 flex justify-between font-bold text-lg mt-2">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <Button
                                className="w-full mt-6 bg-yellow-600 hover:bg-yellow-700 text-white shadow-md hover:shadow-lg transition-all h-12 text-base"
                                onClick={handleCheckout}
                                disabled={loading}
                            >
                                {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Confirmar Pedido"}
                                {!loading && <ArrowRight className="ml-2 h-5 w-5" />}
                            </Button>

                            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-neutral-400">
                                <ShieldCheck className="h-4 w-4" />
                                <span>Compra protegida y segura</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
