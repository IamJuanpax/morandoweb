
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import Link from "next/link";
import Image from "next/image";

export const dynamic = 'force-dynamic';

export default async function MisComprasPage() {
    const { userId } = await auth();
    if (!userId) {
        redirect("/sign-in");
    }

    const user = await prisma.user.findUnique({
        where: { clerkId: userId },
        include: {
            orders: {
                include: {
                    items: {
                        include: { product: true }
                    }
                },
                orderBy: { createdAt: 'desc' }
            }
        }
    });

    if (!user) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold mb-2">Perfil no encontrado</h1>
                <p className="text-muted-foreground">No hemos podido localizar tu información de usuario.</p>
            </div>
        );
    }

    if (user.orders.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center">
                <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-full mb-6">
                    <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                    </svg>
                </div>
                <h1 className="text-3xl font-bold mb-4 font-serif">Aún no tienes compras</h1>
                <p className="text-muted-foreground mb-8 max-w-md">
                    Descubre nuestra selección de aceitunas premium y comienza tu experiencia gastronómica.
                </p>
                <Link
                    href="/productos"
                    className="bg-yellow-600 text-white px-8 py-3 rounded-full font-medium hover:bg-yellow-700 transition w-full sm:w-auto"
                >
                    Explorar Productos
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <div className="mb-10">
                <h1 className="text-4xl font-bold font-serif mb-2 text-yellow-600 dark:text-yellow-500">Historial de Compras</h1>
                <p className="text-neutral-500 dark:text-neutral-400">Revisa el estado y detalle de tus pedidos anteriores.</p>
            </div>

            <div className="space-y-8">
                {user.orders.map(order => (
                    <div key={order.id} className="group border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition-shadow">
                        <div className="bg-neutral-50 dark:bg-neutral-900/50 p-6 border-b border-neutral-200 dark:border-neutral-800 flex flex-wrap gap-4 justify-between items-center">
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">ID de Orden</span>
                                <span className="font-mono text-sm">{order.id}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Fecha</span>
                                <span className="text-sm font-medium">
                                    {new Intl.DateTimeFormat('es-AR', { dateStyle: 'long', timeStyle: 'short' }).format(order.createdAt)}
                                </span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Total</span>
                                <span className="text-lg font-bold text-yellow-600">${Number(order.total).toFixed(2)}</span>
                            </div>
                            <div>
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${order.status === 'pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                    order.status === 'paid' ? 'bg-green-50 text-green-700 border-green-200' :
                                        'bg-gray-50 text-gray-700 border-gray-200'
                                    }`}>
                                    {order.status === 'pending' ? 'En Proceso' : order.status === 'paid' ? 'Completado' : order.status}
                                </span>
                            </div>
                        </div>

                        <div className="p-6">
                            <ul className="space-y-6">
                                {order.items.map(item => {
                                    if (!item.product) return null;
                                    const hasImage = item.product.images && item.product.images.length > 0 && item.product.images[0];
                                    return (
                                        <li key={item.id} className="flex gap-4 items-center">
                                            <div className="shrink-0 w-16 h-16 bg-neutral-100 rounded-lg overflow-hidden relative border border-neutral-100 dark:border-neutral-800">
                                                {hasImage ? (
                                                    <Image
                                                        src={item.product.images[0]}
                                                        alt={item.product.name}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-neutral-300">
                                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-medium text-neutral-900 dark:text-neutral-100">{item.product.name}</h4>
                                                <p className="text-sm text-neutral-500 dark:text-neutral-400">Cantidad: {item.quantity}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium text-neutral-900 dark:text-neutral-100">${Number(item.price).toFixed(2)}</p>
                                                {item.quantity > 1 && (
                                                    <p className="text-xs text-neutral-400">${(Number(item.price) / item.quantity).toFixed(2)} c/u</p>
                                                )}
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
