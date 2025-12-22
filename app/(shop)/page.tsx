import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowRight, Star, ShoppingBag, Leaf, Award } from "lucide-react";

export const metadata = {
    title: "Inicio",
};

const HERO_SLIDES = [
    {
        id: 1,
        title: "Excelencia en cada Oliva",
        subtitle: "Cosechadas a mano y seleccionadas para brindar un sabor único.",
        image: "https://images.unsplash.com/photo-1622345095034-406ce8a4c330?q=80&w=2670&auto=format&fit=crop", // Campo Olivos
        cta: "Ver Productos",
        href: "/productos"
    },
    {
        id: 2,
        title: "Aceite Virgen Extra",
        subtitle: "Prensada en frío. El oro líquido de Mendoza en tu mesa.",
        image: "https://images.unsplash.com/photo-1474979266404-74fc56104a63?q=80&w=2670&auto=format&fit=crop", // Aceite
        cta: "Descubrir",
        href: "/productos/aceite-oliva"
    },
    {
        id: 3,
        title: "Variedades Gourmet",
        subtitle: "Rellenas, negras, griegas. Una experiencia para cada ocasión.",
        image: "https://images.unsplash.com/photo-1594911467554-e05391d14cb3?q=80&w=2669&auto=format&fit=crop", // Aceitunas plato
        cta: "Explorar Sabores",
        href: "/productos"
    },
    {
        id: 4,
        title: "Venta Directa de Fábrica",
        subtitle: "Sin intermediarios. La mejor calidad al mejor precio.",
        image: "https://images.unsplash.com/photo-1649692468798-e7bd41bd0401?q=80&w=2600&auto=format&fit=crop", // Fabrica/Frascos
        cta: "Comprar Ahora",
        href: "/contacto"
    },
    {
        id: 5,
        title: "Garantía Morando",
        subtitle: "Más de 50 años de tradición familiar nos avalan.",
        image: "https://images.unsplash.com/photo-1574548079633-1496a8497d34?q=80&w=2670&auto=format&fit=crop", // Familia / Mesa
        cta: "Conocenos",
        href: "/nosotros"
    }
];

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen">

            {/* 1. HERO CAROUSEL */}
            <section className="relative w-full">
                <Carousel
                    className="w-full"
                    opts={{
                        loop: true,
                        duration: 60
                    }}
                >
                    <CarouselContent>
                        {HERO_SLIDES.map((slide) => (
                            <CarouselItem key={slide.id} className="relative h-[80vh] w-full">
                                <div className="absolute inset-0">
                                    {/* Background Image with Overlay */}
                                    <div className="absolute inset-0 bg-black/40 z-10" />
                                    <Image
                                        src={slide.image}
                                        alt={slide.title}
                                        fill
                                        className="object-cover"
                                        priority={slide.id === 1}
                                    />
                                </div>

                                <div className="relative z-20 h-full container flex flex-col items-center justify-center text-center text-white space-y-6">
                                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-700">
                                        {slide.title}
                                    </h1>
                                    <p className="text-xl md:text-2xl max-w-2xl font-light text-zinc-100 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200">
                                        {slide.subtitle}
                                    </p>
                                    <Link href={slide.href} className="animate-in fade-in zoom-in duration-1000 delay-300">
                                        <Button size="lg" className="rounded-full px-8 text-lg bg-primary text-black hover:bg-primary/90 border-none">
                                            {slide.cta}
                                        </Button>
                                    </Link>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-4 bg-transparent border-white/20 text-white hover:bg-white/20 hover:text-white" />
                    <CarouselNext className="right-4 bg-transparent border-white/20 text-white hover:bg-white/20 hover:text-white" />
                </Carousel>
            </section>

            {/* 2. CATEGORÍAS (Placeholder) */}
            <section className="py-20 container">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Nuestras Variedades</h2>
                        <p className="text-muted-foreground mt-2">Explora los sabores que tenemos para ofrecerte.</p>
                    </div>
                    <Link href="/productos" className="hidden md:flex items-center text-primary font-medium hover:underline">
                        Ver todo <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Category Placeholder Cards */}
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 border cursor-pointer">
                            <div className="absolute inset-0 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
                                {i === 1 ? '🫒' : i === 2 ? '🏺' : '🌶️'}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                                <h3 className="text-xl font-bold text-white">
                                    {i === 1 ? 'Aceitunas Clásicas' : i === 2 ? 'Aceites Premium' : 'Gourmet & Rellenas'}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. PROPUESTA DE VALOR (Banners) */}
            <section className="py-16 bg-zinc-900 text-white">
                <div className="container grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
                    <div className="px-4 py-8 flex flex-col items-center">
                        <div className="mb-4 p-4 rounded-full bg-primary/20 text-primary">
                            <Star className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Calidad Premium</h3>
                        <p className="text-zinc-400">Selección manual de las mejores cosechas de la temporada.</p>
                    </div>
                    <div className="px-4 py-8 flex flex-col items-center">
                        <div className="mb-4 p-4 rounded-full bg-primary/20 text-primary">
                            <Leaf className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">100% Natural</h3>
                        <p className="text-zinc-400">Procesos tradicionales sin aditivos artificiales invasivos.</p>
                    </div>
                    <div className="px-4 py-8 flex flex-col items-center">
                        <div className="mb-4 p-4 rounded-full bg-primary/20 text-primary">
                            <Award className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Compra Segura</h3>
                        <p className="text-zinc-400">Directo de fábrica a tu hogar con garantía de satisfacción.</p>
                    </div>
                </div>
            </section>

            {/* 4. CTA NEWSLETTER (Placeholder) */}
            <section className="py-24 container text-center">
                <div className="max-w-2xl mx-auto space-y-6">
                    <h2 className="text-3xl font-bold">Únete al Club Morando</h2>
                    <p className="text-muted-foreground text-lg">
                        Recibe ofertas exclusivas, recetas y novedades antes que nadie.
                    </p>
                    <div className="flex gap-2 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Tu email aquí..."
                            className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        <Button size="lg" className="shrink-0">Suscribirse</Button>
                    </div>
                </div>
            </section>

        </div>
    );
}
