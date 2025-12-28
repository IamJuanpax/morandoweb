
import { Resend } from 'resend';
import { OrderReceiptEmail } from '@/components/emails/order-receipt';
import { NewsletterWelcomeEmail } from '@/components/emails/newsletter-welcome';
import { ReactElement } from 'react';

const resend = new Resend(process.env.RESEND_API_KEY || 're_123456789');

export async function sendNewsletterWelcomeEmail(email: string) {
    if (!process.env.RESEND_API_KEY) {
        console.warn("⚠️ RESEND_API_KEY is missing. Email skipped.");
        return;
    }

    try {
        const data = await resend.emails.send({
            from: 'Club Morando <noreply@resend.dev>', // Use verified domain in prod
            to: [email],
            subject: '¡Bienvenido al Club Morando!',
            react: NewsletterWelcomeEmail() as ReactElement,
        });

        console.log(`📧 Newsletter email sent to ${email}:`, data);
        return { success: true, data };
    } catch (error) {
        console.error("❌ Error sending newsletter email:", error);
        return { success: false, error };
    }
}

interface SendOrderEmailProps {
    email: string;
    orderId: string;
    total: number;
    items: Array<{
        name: string;
        quantity: number;
        price: number;
        image?: string;
    }>;
    userName: string;
}

export async function sendOrderConfirmationEmail({
    email,
    orderId,
    total,
    items,
    userName
}: SendOrderEmailProps) {
    if (!process.env.RESEND_API_KEY) {
        console.warn("⚠️ RESEND_API_KEY is missing. Email skipped.");
        return;
    }

    try {
        const data = await resend.emails.send({
            from: 'Aceitunas Morando <onboarding@resend.dev>', // Use verified domain in prod
            to: [email],
            subject: `Confirmación de Compra #${orderId}`,
            react: OrderReceiptEmail({
                orderId,
                total,
                items,
                userName
            }) as ReactElement,
        });

        console.log(`📧 Email sent to ${email}:`, data);
        return data;
    } catch (error) {
        console.error("❌ Error sending email:", error);
        return null;
    }
}
