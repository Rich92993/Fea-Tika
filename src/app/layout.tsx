import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import CartDrawer from "@/components/CartDrawer";
import VibrantBackground from "@/components/VibrantBackground";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "ÉLÉGANCE | Premium Products",
  description: "Discover our curated collection of premium products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans relative text-foreground antialiased bg-transparent">
        <VibrantBackground />
        <div className="relative z-10 min-h-screen flex flex-col">
          {children}
          <CartDrawer />
        </div>
      </body>
    </html>
  );
}
