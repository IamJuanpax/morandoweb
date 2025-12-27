"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useState, useRef } from "react";
import { sendContactForm } from "@/app/actions/contact";

export default function ContactPage() {
    const [loading, setLoading] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const result = await sendContactForm(formData);

        if (result.success) {
            toast.success("¡Mensaje enviado!", {
                description: "Nos pondremos en contacto pronto."
            });
            formRef.current?.reset();
        } else {
            toast.error("Error al enviar", {
                description: result.message
            });
        }
        setLoading(false);
    };

    return (
        <div className="container py-12 md:py-24">
            <div className="flex flex-col mb-12 text-center md:text-left">
                <h1 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">Contacto</h1>
                <p className="text-muted-foreground mt-4 max-w-2xl text-lg">
                    Estamos aquí para responder tus consultas. Ya sea para pedidos mayoristas o consultas particulares, escribinos.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                {/* Formulario */}
                <div className="order-2 lg:order-1">
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 bg-card p-6 md:p-8 rounded-xl border shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="nombre">Nombre</Label>
                                <Input id="nombre" name="name" placeholder="Juan Pérez" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" placeholder="juan@ejemplo.com" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="asunto">Asunto</Label>
                            <Input id="asunto" name="subject" placeholder="Consulta sobre productos / Venta Mayorista" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="mensaje">Mensaje</Label>
                            <Textarea
                                id="mensaje"
                                name="message"
                                placeholder="Hola, quisiera consultar precios por mayor..."
                                className="min-h-[150px]"
                                required
                            />
                        </div>

                        <Button type="submit" size="lg" className="w-full md:w-auto gap-2" disabled={loading}>
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                            {loading ? "Enviando..." : "Enviar Mensaje"}
                        </Button>
                    </form>
                </div>

                {/* Info de Contacto */}
                <div className="order-1 lg:order-2 space-y-8">
                    <div className="bg-secondary/30 p-8 rounded-xl space-y-8">
                        <h3 className="font-semibold text-xl">Información Directa</h3>

                        <div className="flex items-start gap-4">
                            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                                <MapPin className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-medium">Nuestra Fábrica</p>
                                <p className="text-muted-foreground">Ruta Nacional 7, Km 1000</p>
                                <p className="text-muted-foreground">San Martín, Mendoza, Argentina</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                                <Phone className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-medium">Teléfono</p>
                                <p className="text-muted-foreground">+54 9 261 123-4567</p>
                                <p className="text-xs text-muted-foreground mt-1">Lunes a Viernes de 9hs a 17hs</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                                <Mail className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-medium">Email</p>
                                <p className="text-muted-foreground">ventas@aceitunasmorando.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Mapa Placeholder */}
                    <div className="aspect-video w-full bg-muted rounded-xl overflow-hidden relative border">
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                            <span className="flex items-center gap-2"><MapPin /> Mapa de Google Maps</span>
                        </div>
                        {/* <iframe ... /> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
