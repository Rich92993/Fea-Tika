'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { motion } from 'framer-motion';

export default function Navbar() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const setIsCartOpen = useCartStore((state) => state.setIsCartOpen);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/40 backdrop-blur-xl shadow-lg">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-serif font-bold tracking-tight text-white drop-shadow-lg">
          ÉLÉGANCE
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/shop" className="text-sm font-medium text-gray-200 hover:text-white transition-colors">
            Shop
          </Link>
          <Link href="/collections" className="text-sm font-medium text-gray-200 hover:text-white transition-colors">
            Collections
          </Link>
          <Link href="/about" className="text-sm font-medium text-gray-200 hover:text-white transition-colors">
            About
          </Link>
        </div>

        <button onClick={() => setIsCartOpen(true)} className="relative p-2 text-gray-200 hover:text-white transition-colors">
          <ShoppingBag className="h-5 w-5" />
          {totalItems > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-bold text-black"
            >
              {totalItems}
            </motion.span>
          )}
        </button>
      </nav>
    </header>
  );
}
