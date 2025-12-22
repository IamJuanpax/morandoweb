import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Award, Leaf, Users } from "lucide-react";

export const metadata = {
    title: "Nosotros",
    description: "Conoce la historia y tradición detrás de Aceitunas MORANDO.",
};

export default function AboutPage() {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative h-[400px] w-full flex items-center justify-center overflow-hidden bg-zinc-900">
                <div className="absolute inset-0 opacity-40">
                    {/* Placeholder for Hero Image */}
                    <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1474979266404-74fc56104a63?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center" />
                </div>
                <div className="relative z-10 container text-center space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
                        Tradición <span className="text-primary">Olirva</span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-200 max-w-2xl mx-auto">
                        Más de 50 años llevando el sabor auténtico de la tierra a tu mesa.
                        Pasión por la calidad y el detalle en cada aceituna.
                    </p>
                </div>
            </section>

            {/* Historia */}
            <section className="container py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold tracking-tight text-primary">Nuestra Historia</h2>
                        <div className="space-y-4 text-muted-foreground leading-relaxed">
                            <p>
                                Aceitunas MORANDO nació con un propósito simple pero ambicioso: seleccionar las mejores cosechas de la región y transformarlas en productos de excelencia. Lo que comenzó como un pequeño emprendimiento familiar, hoy es sinónimo de calidad en el mercado gourmet.
                            </p>
                            <p>
                                Ubicados en el corazón de la zona productiva, supervisamos cada etapa del proceso: desde el cuidado del olivar hasta el envasado final. Mantenemos recetas ancestrales, combinadas con tecnología moderna para asegurar la inocuidad sin perder la esencia artesanal.
                            </p>
                            <p>
                                No solo vendemos aceitunas; compartimos una experiencia culinaria que ha pasado de generación en generación.
                            </p>
                        </div>

                    </div>
                    <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-muted shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                        {/* Placeholder Image */}
                        <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-6xl">
                            🏺
                        </div>
                    </div>
                </div>
            </section>

            {/* Valores */}
            <section className="bg-secondary/30 py-16">
                <div className="container">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight mb-4">Nuestros Pilares</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            La excelencia no es un acto, es un hábito. Estos son los valores que guían nuestro trabajo diario.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center text-center p-6 rounded-xl bg-background border shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                                <Leaf className="h-6 w-6" />
                            </div>
                            <h3 className="font-semibold text-xl mb-2">Natural 100%</h3>
                            <p className="text-muted-foreground">
                                Sin aditivos innecesarios. Respetamos los tiempos de curado natural para obtener el mejor sabor y textura.
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center p-6 rounded-xl bg-background border shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                                <Award className="h-6 w-6" />
                            </div>
                            <h3 className="font-semibold text-xl mb-2">Calidad Premium</h3>
                            <p className="text-muted-foreground">
                                Selección calibre por calibre. Solo las mejores aceitunas llegan al frasco de Morando.
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center p-6 rounded-xl bg-background border shadow-sm hover:shadow-md transition-shadow">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                                <Users className="h-6 w-6" />
                            </div>
                            <h3 className="font-semibold text-xl mb-2">Trato Familiar</h3>
                            <p className="text-muted-foreground">
                                Somos una familia que atiende a otras familias. Nuestro servicio al cliente es tan personal como nuestro producto.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="container py-20 text-center">
                <div className="bg-primary rounded-3xl p-8 md:p-16 relative overflow-hidden">
                    <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-black">¿Listo para probar?</h2>
                        <p className="text-black/80 text-lg">
                            Explora nuestro catálogo y descubre por qué somos la elección de los paladares más exigentes.
                        </p>
                        <Link href="/productos">
                            <Button size="lg" className="bg-black text-white hover:bg-zinc-800 border-none shadow-xl">
                                Ver Tienda
                            </Button>
                        </Link>
                    </div>
                    {/* Decorative pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-multiply"></div>
                </div>
            </section>
        </div>
    );
}
