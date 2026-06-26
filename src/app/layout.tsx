import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import CartDrawer from "@/components/CartDrawer";
import VibrantBackground from "@/components/VibrantBackground";
import LiveChat from '@/components/LiveChat';

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Fea Tika",
  description: "We sell quality items aki ae mahu'inga fe'unga",
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
          <LiveChat />
        </div>
      </body>
    </html>
  );
}