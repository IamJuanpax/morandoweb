
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const CATEGORIES = [
    { name: 'Aceitunas Verdes', slug: 'aceitunas-verdes', description: 'Las clásicas aceitunas verdes de mesa.' },
    { name: 'Aceitunas Negras', slug: 'aceitunas-negras', description: 'Aceitunas negras naturales tipo griego.' },
    { name: 'Aceitunas Rellenas', slug: 'aceitunas-rellenas', description: 'Variedades rellenas con pimiento, queso, etc.' },
    { name: 'Aceites de Oliva', slug: 'aceites', description: 'Aceite de oliva virgen extra.' },
    { name: 'Conservas / Pickles', slug: 'conservas', description: 'Vegetales en conserva.' },
    { name: 'Pastas de Aceituna', slug: 'pastas', description: 'Tapenales y pastas untables.' },
]

async function main() {
    console.log('Start seeding...')

    for (const category of CATEGORIES) {
        const cat = await prisma.category.upsert({
            where: { slug: category.slug },
            update: {},
            create: category,
        })
        console.log(`Created category: ${cat.name}`)

        // Productos de Ejemplo asociados a la categoría
        if (category.slug === 'aceitunas-verdes') {
            await prisma.product.createMany({
                data: [
                    {
                        name: "Aceitunas Verdes Arauco",
                        description: "Nuestras mejores aceitunas variedad Arauco, carnosas y con el punto justo de sal.",
                        price: 4500,
                        stock: 50,
                        categoryId: cat.id,
                        images: ["/aceitunas-verdes-servidas-en-un-bol-para-un-brunch.jpg"],
                        isAvailable: true
                    },
                    {
                        name: "Aceitunas Verdes Descarozadas",
                        description: "Ideales para picadas y ensaladas, sin carozo para mayor comodidad.",
                        price: 5200,
                        stock: 30,
                        categoryId: cat.id,
                        images: ["/pexels-polina-tankilevitch-4109910.jpg"],
                        isAvailable: true
                    }
                ]
            });
        }

        if (category.slug === 'aceitunas-negras') {
            await prisma.product.createMany({
                data: [
                    {
                        name: "Aceitunas Negras Griegas",
                        description: "Curadas naturalmente, sabor intenso y textura arrugada característica.",
                        price: 5500,
                        stock: 40,
                        categoryId: cat.id,
                        images: ["/alto-angulo-aceitunas-parmesano-y-pan.jpg"], // Usando una de las fotos oscuras/ambiente
                        isAvailable: true
                    }
                ]
            });
        }

        if (category.slug === 'aceites') {
            await prisma.product.createMany({
                data: [
                    {
                        name: "Aceite de Oliva Virgen Extra (500ml)",
                        description: "Prensada en frío, acidez menor a 0.5%.",
                        price: 8500,
                        stock: 100,
                        categoryId: cat.id,
                        images: ["/close-up-de-aceitunas-amarillas-frescas.jpg"], // Placeholder, en realidad es aceitunas pero combina
                        isAvailable: true
                    }
                ]
            });
        }
    }

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
