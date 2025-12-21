import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";
import { dark } from "@clerk/themes";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Aceitunas MORANDO",
    default: "Aceitunas MORANDO | Calidad Premium",
  },
  description: "Ecommerce de aceitunas de alta gama. Venta directa de fábrica.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      localization={esES}
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#eab308",
          colorText: "white"
        }
      }}
    >
      <html lang="es" suppressHydrationWarning>
        <body
          className={`${outfit.variable} font-sans antialiased bg-background text-foreground`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
