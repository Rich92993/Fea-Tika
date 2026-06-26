'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Banknote, Building2, QrCode, CheckCircle2, Copy, MessageCircle } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState<'bsp' | 'tdb' | 'wechat'>('bsp');
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentReference: '',
  });

  // Mock cart data (you'll connect this to your real cart later)
  const cartItems = [
    { id: '1', name: 'Premium Running Shoes', price: 189.00, quantity: 1 },
  ];
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send the order to your backend/database
    setOrderSubmitted(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  if (orderSubmitted) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 text-center">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-green-400" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-white mb-4">
              Order Submitted!
            </h1>
            <p className="text-gray-300 mb-6">
              Thank you for your order. We've received your payment reference and will process your order shortly.
            </p>
            <p className="text-gray-400 text-sm mb-8">
              We'll send you a confirmation email at <strong>{formData.email}</strong>
            </p>
            <button
              onClick={() => router.push('/')}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium rounded-full hover:from-cyan-600 hover:to-purple-600 transition-all"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif font-bold text-white mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-gray-300">
                  <span>{item.name} x{item.quantity}</span>
                  <span>K{item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/10 pt-4 flex justify-between text-xl font-bold text-white">
              <span>Total</span>
              <span>K{total.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Select Payment Method</h2>

            <div className="space-y-3 mb-6">
              <button
                onClick={() => setSelectedPayment('bsp')}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all ${
                  selectedPayment === 'bsp'
                    ? 'bg-cyan-500/20 border-cyan-400/50'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <Building2 className="h-6 w-6 text-cyan-400" />
                <div className="text-left">
                  <div className="font-bold text-white">BSP Bank Transfer</div>
                  <div className="text-sm text-gray-400">Bank of South Pacific</div>
                </div>
              </button>

              <button
                onClick={() => setSelectedPayment('tdb')}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all ${
                  selectedPayment === 'tdb'
                    ? 'bg-cyan-500/20 border-cyan-400/50'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <Banknote className="h-6 w-6 text-purple-400" />
                <div className="text-left">
                  <div className="font-bold text-white">TDB Bank Transfer</div>
                  <div className="text-sm text-gray-400">Trade Development Bank</div>
                </div>
              </button>

              <button
                onClick={() => setSelectedPayment('wechat')}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all ${
                  selectedPayment === 'wechat'
                    ? 'bg-cyan-500/20 border-cyan-400/50'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <QrCode className="h-6 w-6 text-green-400" />
                <div className="text-left">
                  <div className="font-bold text-white">WeChat Pay</div>
                  <div className="text-sm text-gray-400">Scan QR code to pay</div>
                </div>
              </button>
            </div>

            {/* Payment Details */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6">
              {selectedPayment === 'bsp' && (
                <div>
                  <h3 className="font-bold text-white mb-3">BSP Account Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Account Name:</span>
                      <span className="text-white font-mono">FEATIKA Store</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Account Number:</span>
                      <span className="text-white font-mono">123456789</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Branch:</span>
                      <span className="text-white">Port Moresby</span>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard('123456789')}
                    className="mt-4 flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300"
                  >
                    <Copy className="h-4 w-4" /> Copy Account Number
                  </button>
                </div>
              )}

              {selectedPayment === 'tdb' && (
                <div>
                  <h3 className="font-bold text-white mb-3">TDB Account Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Account Name:</span>
                      <span className="text-white font-mono">FEATIKA Store</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Account Number:</span>
                      <span className="text-white font-mono">987654321</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Branch:</span>
                      <span className="text-white">Port Moresby</span>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard('987654321')}
                    className="mt-4 flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300"
                  >
                    <Copy className="h-4 w-4" /> Copy Account Number
                  </button>
                </div>
              )}

              {selectedPayment === 'wechat' && (
                <div className="text-center">
                  <h3 className="font-bold text-white mb-3">WeChat Pay QR Code</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Scan with WeChat to pay K{total.toFixed(2)}
                  </p>
                  {/* Replace this with your actual WeChat QR code image */}
                  <div className="bg-white p-4 rounded-xl inline-block mb-4">
                    <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                      <QrCode className="h-24 w-24 text-gray-400" />
                      <span className="sr-only">WeChat Pay QR Code</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Upload your WeChat Pay QR code to: /public/wechat-qr.jpg
                  </p>
                </div>
              )}
            </div>

            {/* Customer Info Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  placeholder="+675 1234 5678"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Delivery Address *
                </label>
                <textarea
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  placeholder="Enter your delivery address..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Payment Reference / Transaction ID *
                </label>
                <input
                  type="text"
                  required
                  value={formData.paymentReference}
                  onChange={(e) => setFormData({ ...formData, paymentReference: e.target.value })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  placeholder="e.g., BSP123456 or WeChat TXN ID"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Enter the transaction ID or reference number from your payment
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-xl hover:from-cyan-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-cyan-500/25"
              >
                Complete Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
