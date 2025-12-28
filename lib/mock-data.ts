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
        image: "/alto-angulo-aceitunas-parmesano-y-pan.jpg",
        category: "Aceitunas Verdes"
    },
    {
        id: "2",
        slug: "aceitunas-negras-griegas-250g",
        name: "Aceitunas Negras Tipo Griega",
        description: "Aceitunas negras arrugadas, con un sabor intenso y característico. Curadas en sal.",
        price: 5200,
        image: "/pexels-pixabay-415340.jpg",
        category: "Aceitunas Negras"
    },
    {
        id: "3",
        slug: "aceite-oliva-extra-virgen-500ml",
        name: "Aceite de Oliva Virgen Extra",
        description: "Aceite de primera prensada en frío. Acidez menor a 0.5%. Notas frutadas.",
        price: 8900,
        image: "/close-up-de-aceitunas-amarillas-frescas.jpg",
        category: "Aceites"
    },
    {
        id: "4",
        slug: "aceitunas-rellenas-morron-300g",
        name: "Aceitunas Rellenas con Morrón",
        description: "Clásicas aceitunas verdes rellenas con pimiento rojo natural. Sabor equilibrado.",
        price: 4800,
        image: "/aceitunas-verdes-servidas-en-un-bol-para-un-brunch.jpg",
        category: "Rellenas"
    }
];
