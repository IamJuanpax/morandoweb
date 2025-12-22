export interface Product {
    id: string;
    slug: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
}

export const MOCK_PRODUCTS: Product[] = [
    {
        id: "1",
        slug: "aceitunas-verdes-premium-500g",
        name: "Aceitunas Verdes Premium",
        description: "Aceitunas verdes de gran tamaño, cosechadas a mano en Mendoza. Ideales para aperitivos.",
        price: 4500,
        image: "/placeholder-olive-green.jpg",
        category: "Aceitunas Verdes"
    },
    {
        id: "2",
        slug: "aceitunas-negras-griegas-250g",
        name: "Aceitunas Negras Tipo Griega",
        description: "Aceitunas negras arrugadas, con un sabor intenso y característico. Curadas en sal.",
        price: 5200,
        image: "/placeholder-olive-black.jpg",
        category: "Aceitunas Negras"
    },
    {
        id: "3",
        slug: "aceite-oliva-extra-virgen-500ml",
        name: "Aceite de Oliva Virgen Extra",
        description: "Aceite de primera prensada en frío. Acidez menor a 0.5%. Notas frutadas.",
        price: 8900,
        image: "/placeholder-oil.jpg",
        category: "Aceites"
    },
    {
        id: "4",
        slug: "aceitunas-rellenas-morron-300g",
        name: "Aceitunas Rellenas con Morrón",
        description: "Clásicas aceitunas verdes rellenas con pimiento rojo natural. Sabor equilibrado.",
        price: 4800,
        image: "/placeholder-stuffed.jpg",
        category: "Rellenas"
    }
];
