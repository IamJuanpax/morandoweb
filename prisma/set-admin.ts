import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const email = process.argv[2]

    if (!email) {
        console.error('❌ Por favor proporciona un email: npx ts-node prisma/set-admin.ts user@example.com')
        process.exit(1)
    }

    console.log(`🔍 Buscando usuario con email: ${email}...`)

    const user = await prisma.user.findUnique({
        where: { email },
    })

    if (!user) {
        console.error(`❌ No se encontró ningún usuario con el email '${email}'. Asegúrate de que se haya registrado primero.`)
        process.exit(1)
    }

    const updatedUser = await prisma.user.update({
        where: { email },
        data: { role: 'ADMIN' },
    })

    console.log(`✅ ¡Éxito! El usuario ${updatedUser.name || updatedUser.email} ahora tiene rol de ADMIN.`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
