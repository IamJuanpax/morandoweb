
import {
    Body,
    Container,
    Column,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
    Tailwind,
} from "@react-email/components";
import * as React from "react";

interface OrderReceiptProps {
    orderId: string;
    total: number;
    items: Array<{
        name: string;
        quantity: number;
        price: number;
        image?: string;
    }>;
    userName?: string;
}

export const OrderReceiptEmail = ({
    orderId = "12345",
    total = 0,
    items = [],
    userName = "Cliente",
}: OrderReceiptProps) => {
    return (
        <Html>
            <Head />
            <Preview>Tu compra en Aceitunas MORANDO ha sido confirmada</Preview>
            <Tailwind>
                <Body className="bg-white font-sans">
                    <Container className="mx-auto py-5 px-4 max-w-xl">
                        <Section className="mt-8">
                            <Heading className="text-2xl font-bold text-gray-900 text-center mx-auto my-0">
                                MORANDO
                            </Heading>
                            <Text className="text-sm text-gray-500 text-center mt-2 mb-8 uppercase tracking-widest">
                                Aceitunas Premium
                            </Text>
                        </Section>

                        <Section className="border border-solid border-gray-200 rounded-lg p-8">
                            <Heading className="text-xl font-bold text-gray-900 mb-4">
                                ¡Gracias por tu compra, {userName}!
                            </Heading>
                            <Text className="text-gray-700 mb-4">
                                Hemos recibido tu pedido correctamente. A continuación encontrarás el detalle de tu compra.
                            </Text>

                            <Section className="bg-gray-50 p-4 rounded mb-6">
                                <Row>
                                    <Column>
                                        <Text className="text-xs text-gray-500 uppercase font-bold m-0">N° de Orden</Text>
                                        <Text className="text-sm font-mono text-gray-900 m-0">{orderId}</Text>
                                    </Column>
                                    <Column align="right">
                                        <Text className="text-xs text-gray-500 uppercase font-bold m-0">Fecha</Text>
                                        <Text className="text-sm text-gray-900 m-0">
                                            {new Date().toLocaleDateString('es-AR')}
                                        </Text>
                                    </Column>
                                </Row>
                            </Section>

                            <Hr className="border-gray-200 my-6" />

                            <Section>
                                {items.map((item, index) => (
                                    <Row key={index} className="mb-4">
                                        <Column className="w-16 pr-4">
                                            {item.image ? (
                                                <Img
                                                    src={item.image}
                                                    width="64"
                                                    height="64"
                                                    alt={item.name}
                                                    className="rounded object-cover bg-gray-100"
                                                />
                                            ) : (
                                                <div className="w-16 h-16 bg-gray-200 rounded" />
                                            )}
                                        </Column>
                                        <Column>
                                            <Text className="text-sm font-bold text-gray-900 m-0">
                                                {item.name}
                                            </Text>
                                            <Text className="text-xs text-gray-500 m-0">
                                                Cantidad: {item.quantity}
                                            </Text>
                                        </Column>
                                        <Column align="right">
                                            <Text className="text-sm font-medium text-gray-900 m-0">
                                                ${item.price?.toLocaleString('es-AR')}
                                            </Text>
                                        </Column>
                                    </Row>
                                ))}
                            </Section>

                            <Hr className="border-gray-200 my-6" />

                            <Row>
                                <Column>
                                    <Text className="text-base font-bold text-gray-900 m-0">Total</Text>
                                </Column>
                                <Column align="right">
                                    <Text className="text-xl font-bold text-yellow-600 m-0">
                                        ${total.toLocaleString('es-AR')}
                                    </Text>
                                </Column>
                            </Row>
                        </Section>

                        <Section className="mt-8 text-center">
                            <Text className="text-xs text-gray-400">
                                Si tienes alguna pregunta, responde a este correo o contáctanos a través de nuestra web.
                            </Text>
                            <Text className="text-xs text-gray-400 mt-2">
                                © 2025 Aceitunas Morando. Todos los derechos reservados.
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default OrderReceiptEmail;
