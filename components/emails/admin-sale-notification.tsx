
import {
    Body,
    Container,
    Column,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Preview,
    Row,
    Section,
    Text,
    Tailwind,
} from "@react-email/components";
import * as React from "react";

interface AdminSaleNotificationProps {
    orderId: string;
    total: number;
    items: Array<{
        name: string;
        quantity: number;
        price: number;
        image?: string;
    }>;
    buyerName: string;
    buyerEmail: string;
    date: Date;
    paymentMethod: string;
}

export const AdminSaleNotificationEmail = ({
    orderId = "12345",
    total = 0,
    items = [],
    buyerName = "Cliente",
    buyerEmail = "cliente@email.com",
    date = new Date(),
    paymentMethod = "Mercado Pago",
}: AdminSaleNotificationProps) => {
    return (
        <Html>
            <Head />
            <Preview>Nueva venta realizada: Orden #{orderId}</Preview>
            <Tailwind>
                <Body className="bg-white font-sans">
                    <Container className="mx-auto py-5 px-4 max-w-xl">
                        <Section className="mt-8">
                            <Heading className="text-2xl font-bold text-gray-900 text-center mx-auto my-0">
                                MORANDO - Admin
                            </Heading>
                            <Text className="text-sm text-gray-500 text-center mt-2 mb-8 uppercase tracking-widest">
                                Reporte de Nueva Venta
                            </Text>
                        </Section>

                        <Section className="border border-solid border-gray-200 rounded-lg p-8">
                            <Heading className="text-xl font-bold text-gray-900 mb-4">
                                ¡Nueva venta confirmada!
                            </Heading>

                            <Section className="bg-gray-50 p-4 rounded mb-6">
                                <Heading as="h3" className="text-sm font-bold text-gray-900 mb-2 uppercase">
                                    Datos del Comprador
                                </Heading>
                                <Text className="text-sm text-gray-700 m-0">
                                    <strong>Nombre:</strong> {buyerName}
                                </Text>
                                <Text className="text-sm text-gray-700 m-0">
                                    <strong>Email:</strong> {buyerEmail}
                                </Text>
                            </Section>

                            <Section className="bg-gray-50 p-4 rounded mb-6">
                                <Row>
                                    <Column>
                                        <Text className="text-xs text-gray-500 uppercase font-bold m-0">N° de Orden</Text>
                                        <Text className="text-sm font-mono text-gray-900 m-0">{orderId}</Text>
                                    </Column>
                                    <Column align="right">
                                        <Text className="text-xs text-gray-500 uppercase font-bold m-0">Fecha</Text>
                                        <Text className="text-sm text-gray-900 m-0">
                                            {new Date(date).toLocaleDateString('es-AR')} {new Date(date).toLocaleTimeString('es-AR')}
                                        </Text>
                                    </Column>
                                </Row>
                                <Row className="mt-4">
                                    <Column>
                                        <Text className="text-xs text-gray-500 uppercase font-bold m-0">Método de Pago</Text>
                                        <Text className="text-sm text-gray-900 m-0">{paymentMethod}</Text>
                                    </Column>
                                </Row>
                            </Section>

                            <Hr className="border-gray-200 my-6" />

                            <Heading as="h3" className="text-sm font-bold text-gray-900 mb-4 uppercase">
                                Detalle del Pedido
                            </Heading>

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
                                    <Text className="text-xl font-bold text-green-600 m-0">
                                        ${total.toLocaleString('es-AR')}
                                    </Text>
                                </Column>
                            </Row>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default AdminSaleNotificationEmail;
