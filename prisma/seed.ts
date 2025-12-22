import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Comenzando seed...')

    // 1. Crear Categorías
    const categorias = [
        { name: 'Aceitunas Verdes', slug: 'aceitunas-verdes', description: 'Cosecha seleccionada manual.' },
        { name: 'Aceitunas Negras', slug: 'aceitunas-negras', description: 'Variedades griegas y de mesa.' },
        { name: 'Aceites de Oliva', slug: 'aceites', description: 'Virgen Extra de primera prensada.' },
        { name: 'Rellenas', slug: 'rellenas', description: 'Sabores gourmet combinados.' },
    ]

    for (const cat of categorias) {
        await prisma.category.upsert({
            where: { slug: cat.slug },
            update: {},
            create: cat,
        })
    }

    // Obtener referencias a categorías creadas
    const catVerdes = await prisma.category.findUnique({ where: { slug: 'aceitunas-verdes' } })
    const catNegras = await prisma.category.findUnique({ where: { slug: 'aceitunas-negras' } })

    if (!catVerdes || !catNegras) throw new Error('Falló la creación de categorías')

    // 2. Crear Productos
    const productos = [
        {
            name: 'Aceitunas Verdes Premium 500g',
            description: 'Aceitunas de tamaño Extra Large, carnosas y con el punto justo de sal.',
            price: 4500,
            stock: 50,
            images: ['/placeholder-olive-green.jpg'],
            categoryId: catVerdes.id,
            specifications: { "peso_neto": "500g", "envase": "Frasco Vidrio", "variedad": "Arauco" }
        },
        {
            name: 'Aceitunas Negras Griegas 250g',
            description: 'Intensas, arrugadas y curadas en seco. Ideales para ensaladas.',
            price: 5200,
            stock: 30,
            images: ['/placeholder-olive-black.jpg'],
            categoryId: catNegras.id,
            specifications: { "peso_neto": "250g", "envase": "Doypack", "estilo": "Griego" }
        }
    ]

    for (const prod of productos) {
        // Usamos el nombre para buscar si existe (en un caso real usaríamos slug o SKU)
        const existing = await prisma.product.findFirst({ where: { name: prod.name } })
        if (!existing) {
            await prisma.product.create({
                data: prod
            })
        }
    }

    console.log('✅ Seed completado correctamente.')
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
