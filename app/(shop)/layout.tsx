import Navbar from "@/components/shop/navbar";

export default function ShopLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />

            <main className="flex-1">
                {children}
            </main>

            {/* Footer Placeholder */}
            <footer className="py-6 md:px-8 md:py-0">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                    <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                        Built by Aceitunas MORANDO. The source code is available on <a href="#" className="font-medium underline underline-offset-4">GitHub</a>.
                    </p>
                </div>
            </footer>
        </div>
    );
}
