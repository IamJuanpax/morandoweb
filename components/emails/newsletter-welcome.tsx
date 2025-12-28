
import * as React from 'react';
import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
    Tailwind,
} from '@react-email/components';

export const NewsletterWelcomeEmail = () => {
    return (
        <Html>
            <Head />
            <Preview>¡Bienvenido al Club Morando!</Preview>
            <Tailwind>
                <Body className="bg-white font-sans">
                    <Container className="mx-auto py-5 px-4 max-w-xl">
                        <Section className="mt-8">
                            <Heading className="text-2xl font-bold text-center text-zinc-900">
                                ¡Bienvenido al Club Morando! 🫒
                            </Heading>
                            <Text className="text-zinc-600 text-base leading-6">
                                Gracias por suscribirte a nuestro newsletter. Estamos muy contentos de que seas parte de nuestra comunidad.
                            </Text>
                            <Text className="text-zinc-600 text-base leading-6 mt-4">
                                A partir de ahora recibirás:
                            </Text>
                            <ul className="text-zinc-600 text-base leading-6 list-disc list-inside">
                                <li>Novedades sobre nuestras nuevas cosechas.</li>
                                <li>Recetas exclusivas con nuestros productos.</li>
                                <li>Descuentos especiales para miembros.</li>
                            </ul>
                            <Text className="text-zinc-600 text-base leading-6 mt-6">
                                ¡Esperamos que disfrutes de la experiencia Morando!
                            </Text>
                            <Section className="text-center mt-8">
                                <Link
                                    href="https://morando.com.ar"
                                    className="bg-zinc-900 text-white px-6 py-3 rounded-md font-medium no-underline"
                                >
                                    Visitar Tienda
                                </Link>
                            </Section>
                        </Section>
                        <Text className="text-center text-xs text-zinc-400 mt-8">
                            © 2024 Aceitunas Morando. Todos los derechos reservados.
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default NewsletterWelcomeEmail;
