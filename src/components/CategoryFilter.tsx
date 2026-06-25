'use client';

import { motion } from 'framer-motion';
import { categories } from '@/data/products';

type CategoryFilterProps = {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
            selectedCategory === category.id
              ? 'bg-white text-black shadow-lg scale-105'
              : 'bg-white/10 backdrop-blur border border-white/20 text-gray-200 hover:bg-white/20 hover:border-white/40'
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {category.name}
        </motion.button>
      ))}
    </div>
  );
}
