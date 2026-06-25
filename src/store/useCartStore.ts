import { create } from 'zustand';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  isCartOpen: boolean;
  addItem: (product: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  getTotalItems: () => number;
  getCartTotal: () => number;
  setIsCartOpen: (isOpen: boolean) => void;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isCartOpen: false,
  
  addItem: (product) => {
    const existingItem = get().items.find((item) => item.id === product.id);
    if (existingItem) {
      set((state) => ({
        items: state.items.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      }));
    } else {
      set((state) => ({ items: [...state.items, { ...product, quantity: 1 }] }));
    }
    set({ isCartOpen: true }); // Automatically open cart when item is added
  },

  removeItem: (id) => {
    set((state) => ({ items: state.items.filter((item) => item.id !== id) }));
  },

  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      set((state) => ({ items: state.items.filter((item) => item.id !== id) }));
      return;
    }
    set((state) => ({
      items: state.items.map((item) => item.id === id ? { ...item, quantity } : item),
    }));
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getCartTotal: () => {
    return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
}));
