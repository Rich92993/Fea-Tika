'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';
import { Button } from './ui/Button';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, removeItem, updateQuantity, getCartTotal } = useCartStore();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-background shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h2 className="text-lg font-serif font-semibold">Shopping Cart</h2>
              <button onClick={() => setIsCartOpen(false)} className="rounded-full p-2 hover:bg-muted transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 no-scrollbar">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Your cart is empty.</p>
                  <Button variant="outline" className="mt-4" onClick={() => setIsCartOpen(false)}>
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <h3 className="text-sm font-medium line-clamp-1">{item.name}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-md border border-border">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-muted rounded-l-md">
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-muted rounded-r-md">
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <button onClick={() => removeItem(item.id)} className="text-xs text-muted-foreground hover:text-destructive transition-colors">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer / Checkout */}
            {items.length > 0 && (
              <div className="border-t border-border px-6 py-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-base font-medium">Subtotal</span>
                  <span className="text-base font-bold">${getCartTotal().toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground">Shipping and taxes calculated at checkout.</p>
                <Button size="lg" className="w-full">
                  Checkout
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
