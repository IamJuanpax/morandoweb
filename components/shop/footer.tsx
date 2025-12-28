import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";


export default function Footer() {
    return (
        <footer className="bg-zinc-950 text-zinc-300 border-t border-zinc-800">
            <div className="container py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

                    {/* 1. Brand & Description */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-white tracking-tighter">
                            Aceitunas <span className="text-primary">MORANDO</span>
                        </h3>
                        <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">
                            Más de 50 años llevando el auténtico sabor de la oliva a tu mesa. Calidad premium, directo de fábrica.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="hover:text-primary transition-colors">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </Link>
                            <Link href="#" className="hover:text-primary transition-colors">
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </Link>
                        </div>
                    </div>

                    {/* 2. Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Navegación</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
                            </li>
                            <li>
                                <Link href="/productos" className="hover:text-primary transition-colors">Catálogo Completo</Link>
                            </li>
                            <li>
                                <Link href="/nosotros" className="hover:text-primary transition-colors">Nuestra Historia</Link>
                            </li>
                            <li>
                                <Link href="/contacto" className="hover:text-primary transition-colors">Contacto</Link>
                            </li>
                        </ul>
                    </div>

                    {/* 3. Legal / Customer Service */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Atención al Cliente</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/mis-compras" className="hover:text-primary transition-colors">Mis Compras</Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary transition-colors">Envíos y Devoluciones</Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary transition-colors">Preguntas Frecuentes</Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-primary transition-colors">Términos y Condiciones</Link>
                            </li>
                        </ul>
                    </div>

                    {/* 4. Contact Info */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-white">Contacto</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-primary shrink-0" />
                                <span>Nahuel Huapi 1512,<br />Pontevedra, Buenos Aires</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-primary shrink-0" />
                                <span>+54 9 11 1234-5678</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-primary shrink-0" />
                                <span>ventas@aceitunasmorando.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="my-8 h-px w-full bg-zinc-800" />

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
                    <p>© {new Date().getFullYear()} Aceitunas Morando S.A. Todos los derechos reservados.</p>
                    <div className="flex gap-4">
                        <Link href="#" className="hover:text-zinc-300 transition-colors">Privacidad</Link>
                        <Link href="#" className="hover:text-zinc-300 transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
