import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { mockProducts, categories } from '@/data/products';

export default function Home() {
  const featuredProducts = mockProducts.slice(0, 4);

  return (
    <main className="flex-1">
      <Navbar />
      
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:py-32 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight text-white drop-shadow-xl">
          Welcome to <br className="hidden sm:block" /> Fea Tika.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-gray-200 font-normal drop-shadow-md">
          Discover our exclusive collection of premium products designed to elevate your everyday life.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Link href="/shop">
            <button className="px-8 py-3 bg-white text-black text-sm font-bold rounded-full shadow-lg hover:bg-gray-100 transform hover:-translate-y-0.5 transition-all">
              Shop Collection
            </button>
          </Link>
          <Link href="/about">
            <button className="px-8 py-3 bg-black/40 backdrop-blur text-white text-sm font-medium rounded-full border border-white/30 hover:bg-black/60 transition-all">
              Our Story
            </button>
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-serif font-bold text-white drop-shadow-md">Shop by Category</h2>
          <Link href="/shop" className="text-sm font-medium text-gray-200 hover:text-white">View all &rarr;</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.filter(cat => cat.id !== 'all').map((category) => (
            <Link key={category.id} href={`/shop?category=${category.id}`}>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center hover:bg-white/20 hover:border-white/40 transition-all cursor-pointer group">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{category.icon}</div>
                <h3 className="text-sm font-medium text-white">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-serif font-bold text-white drop-shadow-md">Featured Products</h2>
          <Link href="/shop" className="text-sm font-medium text-gray-200 hover:text-white">View all &rarr;</Link>
        </div>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="border-t border-white/10 bg-black/40 backdrop-blur-sm mt-auto">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-400">&copy; 2026 Fea Tika. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
