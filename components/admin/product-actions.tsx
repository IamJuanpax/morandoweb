
"use client";

import { useTransition } from "react";
import { deleteProduct, toggleProductStatus } from "@/app/actions/products";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Trash2, Pencil } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProductActionsProps {
    id: string;
    isAvailable: boolean;
}

export function ProductActions({ id, isAvailable }: ProductActionsProps) {
    const [isPending, startTransition] = useTransition();

    const handleToggle = () => {
        startTransition(async () => {
            const result = await toggleProductStatus(id, isAvailable);
            if (result.success) {
                toast.success(isAvailable ? "Producto pausado" : "Producto activado");
            } else {
                toast.error("Error al cambiar estado");
            }
        });
    };

    const handleDelete = () => {
        if (!confirm("¿Está seguro de borrar permanentemente este producto? Esta acción no se puede deshacer.")) return;

        startTransition(async () => {
            const result = await deleteProduct(id);
            if (result.success) {
                toast.success("Producto eliminado");
            } else {
                toast.error("Error al eliminar");
            }
        });
    };

    return (
        <div className="flex justify-end gap-2">
            <Button
                variant="ghost"
                size="icon"
                onClick={handleToggle}
                disabled={isPending}
                title={isAvailable ? "Pausar publicación" : "Activar publicación"}
            >
                {isAvailable ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
            </Button>

            <Link href={`/admin/products/${id}/edit`}>
                <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                </Button>
            </Link>

            <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                onClick={handleDelete}
                disabled={isPending}
            >
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
}
