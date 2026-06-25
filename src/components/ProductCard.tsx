'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <Link href={`/product/${product.id}`}>
      <motion.div 
        className="group relative flex flex-col gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:bg-white/15 transition-all"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-black/20">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-smooth group-hover:scale-105"
          />
          
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full opacity-0 transition-all duration-300 ease-smooth group-hover:translate-y-0 group-hover:opacity-100">
            <button onClick={handleAddToCart} className="w-full flex items-center justify-center gap-2 py-2.5 bg-white text-black text-sm font-bold rounded-lg shadow-lg hover:bg-gray-100 transition-all">
              <ShoppingBag className="h-4 w-4" />
              Add to Cart
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-cyan-300">{product.category.replace('-', ' ')}</p>
          <h3 className="text-sm font-medium text-white line-clamp-1">{product.name}</h3>
          <p className="text-sm font-bold text-white">${product.price.toFixed(2)}</p>
        </div>
      </motion.div>
    </Link>
  );
}
