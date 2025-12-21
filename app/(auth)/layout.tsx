export const metadata = {
    title: "Autenticación - Aceitunas MORANDO",
};

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-zinc-950">
            {children}
        </div>
    );
}
