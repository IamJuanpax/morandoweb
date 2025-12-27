
import { isAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Package, ShoppingBag, Settings, LogOut } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // 1. Authorization Check
    const isUserAdmin = await isAdmin();

    if (!isUserAdmin) {
        redirect("/");
    }

    // 2. Admin Layout Structure
    return (
        <div className="flex h-screen bg-neutral-100 dark:bg-neutral-900">
            {/* Sidebar (Desktop) */}
            <aside className="hidden w-64 flex-col border-r bg-white dark:bg-black md:flex">
                <div className="flex h-16 items-center px-6 border-b">
                    <Link href="/" className="font-bold text-xl tracking-tight">
                        <span className="text-yellow-600 font-serif">MORANDO</span>
                        <span className="text-neutral-400 text-xs ml-2 uppercase tracking-widest">Admin</span>
                    </Link>
                </div>

                <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                    <Link
                        href="/admin/dashboard"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                        <LayoutDashboard className="h-5 w-5" />
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/products"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                        <Package className="h-5 w-5" />
                        Productos
                    </Link>
                    <Link
                        href="/admin/orders"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                        <ShoppingBag className="h-5 w-5" />
                        Pedidos
                    </Link>
                </nav>

                <div className="border-t p-4">
                    <div className="flex items-center gap-3 px-4 py-3">
                        <UserButton />
                        <span className="text-sm font-medium">Cuenta</span>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="container mx-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
