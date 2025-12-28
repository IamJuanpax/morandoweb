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
import { NewsletterForm } from "@/components/home/newsletter-form";

export const metadata = {
    title: "Inicio",
};

const HERO_SLIDES = [
    {
        id: 1,
        title: "Excelencia en cada Oliva",
        subtitle: "Cosechadas a mano y seleccionadas para brindar un sabor único.",
        image: "/aceitunas-verdes-servidas-en-un-bol-para-un-brunch.jpg",
        cta: "Ver Productos",
        href: "/productos"
    },
    {
        id: 2,
        title: "Sabor Auténtico",
        subtitle: "Disfruta de lo mejor de nuestra tierra en tu mesa.",
        image: "/alto-angulo-aceitunas-parmesano-y-pan.jpg",
        cta: "Descubrir",
        href: "/productos"
    },
    {
        id: 3,
        title: "Calidad Premium",
        subtitle: "Variedades seleccionadas para los paladares más exigentes.",
        image: "/close-up-de-aceitunas-amarillas-frescas.jpg",
        cta: "Explorar Sabores",
        href: "/productos"
    },
    {
        id: 4,
        title: "Venta Directa de Fábrica",
        subtitle: "Sin intermediarios. La mejor calidad al mejor precio.",
        image: "/pexels-polina-tankilevitch-4109910.jpg",
        cta: "Comprar Ahora",
        href: "/contacto"
    },
    {
        id: 5,
        title: "Tradición Familiar",
        subtitle: "Más de 50 años compartiendo nuestra pasión por las aceitunas.",
        image: "/pexels-gary-barnes-6231906.jpg",
        cta: "Conocenos",
        href: "/nosotros"
    }
];

const VARIETIES = [
    {
        id: 1,
        title: "Aceitunas Clásicas",
        image: "/aceitunas-verdes-servidas-en-un-bol-para-un-brunch.jpg",
        href: "/productos?categoria=clasicas"
    },
    {
        id: 2,
        title: "Selección Premium",
        image: "/close-up-de-aceitunas-amarillas-frescas.jpg",
        href: "/productos?categoria=premium"
    },
    {
        id: 3,
        title: "Gourmet & Rellenas",
        image: "/alto-angulo-aceitunas-parmesano-y-pan.jpg",
        href: "/productos?categoria=gourmet"
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
                    {/* Category Cards */}
                    {VARIETIES.map((variety) => (
                        <Link key={variety.id} href={variety.href}>
                            <div className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 border cursor-pointer">
                                <Image
                                    src={variety.image}
                                    alt={variety.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-6">
                                    <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                                        {variety.title}
                                    </h3>
                                </div>
                            </div>
                        </Link>
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
                    <NewsletterForm />
                </div>
            </section>

        </div>
    );
}
