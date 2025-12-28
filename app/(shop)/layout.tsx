import Navbar from "@/components/shop/navbar";
import Footer from "@/components/shop/footer";

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
            <Footer />
        </div>
    );
}
