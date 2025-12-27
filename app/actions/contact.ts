
"use server";

import { Resend } from 'resend';
import { ContactInquiryEmail } from '@/components/emails/contact-inquiry';
import { ReactElement } from 'react';

// === CONFIGURACIÓN ===
// Aquí puedes definir el email donde se recibirán las consultas
const DESTINATION_EMAIL = process.env.CONTACT_EMAIL || "jubritos20@gmail.com";

// Inicialización segura para evitar crash si falta la API Key
const resend = new Resend(process.env.RESEND_API_KEY || 're_123456789');

export async function sendContactForm(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
        return { success: false, message: "Faltan campos requeridos" };
    }

    if (!process.env.RESEND_API_KEY) {
        console.warn("⚠️ RESEND_API_KEY not found. Contact form simulation.");
        // Simulación de éxito para desarrollo sin API Key
        return { success: true, message: "Mensaje simulado correctamente (Falta API Key)" };
    }

    try {
        await resend.emails.send({
            from: 'Aceitunas Morando Web <onboarding@resend.dev>', // Use verified domain in prod
            to: [DESTINATION_EMAIL],
            replyTo: email,
            subject: `Consulta Web: ${subject || 'Nueva consulta'}`,
            react: ContactInquiryEmail({
                name,
                email,
                subject: subject || 'Sin asunto',
                message
            }) as ReactElement,
        });

        return { success: true, message: "Mensaje enviado exitosamente" };
    } catch (error) {
        console.error("Error sending contact email:", error);
        return { success: false, message: "Error al enviar el mensaje. Intente más tarde." };
    }
}
