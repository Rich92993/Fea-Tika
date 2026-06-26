export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'shoes' | 'earphones' | 'fans' | 'graphic-cards' | 'earrings';
  description: string;
};

export const categories = [
  { id: 'all', name: 'All Products', icon: '???' },
  { id: 'shoes', name: 'Shoes', icon: '??' },
  { id: 'earphones', name: 'Earphones', icon: '??' },
  { id: 'fans', name: 'Fans', icon: '??' },
  { id: 'graphic-cards', name: 'Graphic Cards', icon: '??' },
  { id: 'earrings', name: 'Earrings', icon: '??' },
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Running Shoes',
    price: 100.00,
    image: '/images/shoes/1.jpg',
    category: 'shoes',
    description: 'High-performance running shoes with advanced cushioning technology for ultimate comfort.',
  },
  {
    id: '2',
    name: 'Wireless Pro Earphones',
    price: 249.00,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    category: 'earphones',
    description: 'Premium wireless earphones with active noise cancellation and 30-hour battery life.',
  },
  {
    id: '3',
    name: 'Smart Desktop Fan',
    price: 79.00,
    image: 'https://images.unsplash.com/photo-1610484826917-0f1021308057?auto=format&fit=crop&w=800&q=80',
    category: 'fans',
    description: 'Ultra-quiet smart fan with app control and customizable airflow patterns.',
  },
  {
    id: '4',
    name: 'RTX 4090 Graphics Card',
    price: 1599.00,
    image: 'https://res.cloudinary.com/dmofglu7u/image/upload/v1782442868/Weixin_Image_2026-05-20_090116_384_qi2hnm.jpg',
    category: 'graphic-cards',
    description: 'Top-tier graphics card for gaming and professional workloads with 24GB VRAM.',
  },
  {
    id: '5',
    name: 'Diamond Drop Earrings',
    price: 329.00,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    category: 'earrings',
    description: 'Elegant diamond drop earrings crafted in 18k white gold.',
  },
  {
    id: '6',
    name: 'Classic White Sneakers',
    price: 129.00,
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&q=80',
    category: 'shoes',
    description: 'Timeless white leather sneakers perfect for everyday wear.',
  },
  {
    id: '7',
    name: 'Gaming Headset',
    price: 159.00,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=800&q=80',
    category: 'earphones',
    description: 'Professional gaming headset with 7.1 surround sound and RGB lighting.',
  },
  {
    id: '8',
    name: 'Tower Cooling Fan',
    price: 119.00,
    image: 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?auto=format&fit=crop&w=800&q=80',
    category: 'fans',
    description: 'Powerful tower fan with oscillation and remote control.',
  },
  {
    id: '9',
    name: 'RTX 4080 Graphics Card',
    price: 1199.00,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d8?auto=format&fit=crop&w=800&q=80',
    category: 'graphic-cards',
    description: 'High-performance graphics card for 4K gaming and content creation.',
  },
  {
    id: '10',
    name: 'Gold Hoop Earrings',
    price: 199.00,
    image: 'https://images.unsplash.com/photo-1635767582909-345876111801?auto=format&fit=crop&w=800&q=80',
    category: 'earrings',
    description: 'Classic gold hoop earrings with a modern twist.',
  },
  {
    id: '11',
    name: 'Trail Running Shoes',
    price: 169.00,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=800&q=80',
    category: 'shoes',
    description: 'Rugged trail running shoes with superior grip and durability.',
  },
  {
    id: '12',
    name: 'Earbuds Pro',
    price: 199.00,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
    category: 'earphones',
    description: 'Compact earbuds with premium sound quality and wireless charging case.',
  },
];
