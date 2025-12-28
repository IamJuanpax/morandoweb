"use client";

import { Button } from "@/components/ui/button";
import { subscribeToNewsletter } from "@/app/actions/newsletter";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";

export function NewsletterForm() {
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        startTransition(async () => {
            const result = await subscribeToNewsletter(formData);

            if (result.success) {
                toast.success(result.message);
                (event.target as HTMLFormElement).reset();
            } else {
                toast.error(result.message);
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
            <input
                type="email"
                name="email"
                placeholder="Tu email aquí..."
                required
                className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button size="lg" className="shrink-0" disabled={isPending}>
                {isPending ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Suscribiendo...
                    </>
                ) : (
                    "Suscribirse"
                )}
            </Button>
        </form>
    );
}
