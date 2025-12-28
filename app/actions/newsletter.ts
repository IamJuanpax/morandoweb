'use server';

import { sendNewsletterWelcomeEmail } from "@/lib/mail";
import { z } from "zod";

const newsletterSchema = z.object({
    email: z.string().email({ message: "Por favor ingresa un email válido." }),
});

export async function subscribeToNewsletter(formData: FormData) {
    const email = formData.get('email') as string;

    const validatedFields = newsletterSchema.safeParse({ email });

    if (!validatedFields.success) {
        return {
            message: validatedFields.error.flatten().fieldErrors.email?.[0] || "Error en el email",
            success: false,
        };
    }

    try {
        // Here you would typically also save the email to your database
        // await db.newsletter.create({ data: { email } });

        const result = await sendNewsletterWelcomeEmail(email);

        if (!result || !result.success) {
            return { message: "No se pudo enviar el email de bienvenida.", success: false };
        }

        return { message: "¡Gracias por suscribirte!", success: true };
    } catch {
        return { message: "Ocurrió un error inesperado.", success: false };
    }
}
