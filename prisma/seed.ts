
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
