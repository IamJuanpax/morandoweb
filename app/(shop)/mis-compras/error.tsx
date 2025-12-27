"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service if needed
        console.error(error);
    }, [error]);

    return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center p-4 text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">¡Ups! Algo salió mal.</h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-md">
                Hubo un problema al cargar tu historial de compras. Por favor, intenta nuevamente.
            </p>
            <div className="flex gap-4">
                <Button onClick={() => reset()} variant="outline">
                    Intentar de nuevo
                </Button>
                <Button onClick={() => window.location.href = "/"} variant="default">
                    Volver al inicio
                </Button>
            </div>
            {process.env.NODE_ENV === 'development' && (
                <div className="mt-8 p-4 bg-red-50 text-red-800 rounded-lg text-left text-xs font-mono max-w-2xl overflow-auto border border-red-200">
                    <p className="font-bold mb-2">Detalle del error (Solo desarrollo):</p>
                    {error.message}
                    {error.digest && <p className="mt-1 text-red-600">Digest: {error.digest}</p>}
                </div>
            )}
        </div>
    );
}
