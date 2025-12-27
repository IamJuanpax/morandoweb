
import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Text,
    Tailwind,
    Hr,
} from "@react-email/components";
import * as React from "react";

interface ContactInquiryEmailProps {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export const ContactInquiryEmail = ({
    name,
    email,
    subject,
    message,
}: ContactInquiryEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>Nueva consulta de: {name}</Preview>
            <Tailwind>
                <Body className="bg-white font-sans">
                    <Container className="mx-auto py-5 px-4 max-w-xl">
                        <Section className="mt-8 mb-8 border-b border-gray-200 pb-4">
                            <Heading className="text-xl font-bold text-gray-900 m-0">
                                📩 Nueva Consulta Web
                            </Heading>
                            <Text className="text-gray-500 text-sm mt-1">
                                Has recibido un nuevo mensaje desde el formulario de contacto.
                            </Text>
                        </Section>

                        <Section className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                            <Text className="text-sm font-bold uppercase text-gray-500 tracking-wider mb-1">
                                Remitente
                            </Text>
                            <Text className="text-base text-gray-900 font-medium mb-4">
                                {name} ({email})
                            </Text>

                            <Text className="text-sm font-bold uppercase text-gray-500 tracking-wider mb-1">
                                Asunto
                            </Text>
                            <Text className="text-base text-gray-900 font-medium mb-4">
                                {subject}
                            </Text>

                            <Hr className="border-gray-200 my-4" />

                            <Text className="text-sm font-bold uppercase text-gray-500 tracking-wider mb-1">
                                Mensaje
                            </Text>
                            <Text className="text-base text-gray-800 whitespace-pre-wrap leading-relaxed">
                                {message}
                            </Text>
                        </Section>

                        <Section className="mt-6">
                            <Text className="text-xs text-center text-gray-400">
                                Este correo fue enviado automáticamente desde el sitio web de Aceitunas Morando.
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default ContactInquiryEmail;
