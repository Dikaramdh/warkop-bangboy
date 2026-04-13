"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cartContext";
import { formatCurrency } from "@/lib/utils";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import Image from "next/image";
import React from "react";

interface OrderData {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  guestAddress: string;
  notes?: string;
  orders: {
    productId: string;
    quantity: number;
  }[];
}

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
}

interface CheckoutProps {
  onSubmitOrder: (orderData: OrderData) => Promise<{ success: boolean; orderIds?: string[]; error?: string }>;
  existingOrder?: {
    id: string;
    guestId: string;
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    guestAddress: string;
    productId: string;
    product: {
      name: string;
      price: number;
      image: string;
      desc: string;
    };
  };
}

export default function Checkout({ onSubmitOrder, existingOrder }: CheckoutProps) {
  const router = useRouter();
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: existingOrder?.guestName || "",
    email: existingOrder?.guestEmail || "",
    phone: existingOrder?.guestPhone || "",
    address: existingOrder?.guestAddress || "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const deliveryFee = 5000;
  const subtotal = getTotalPrice();
  const total = subtotal + deliveryFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
    if (submitError) setSubmitError(null);
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, quantity);
    }
  };

  const handleSubmitOrder = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (!customerInfo.name.trim()) throw new Error("Nama lengkap harus diisi");
      if (!customerInfo.phone.trim()) throw new Error("Nomor telepon harus diisi");
      if (!customerInfo.address.trim()) throw new Error("Nomor meja harus diisi");
      if (!customerInfo.email.trim()) throw new Error("Email harus diisi");

      const orderData: OrderData = {
        guestName: customerInfo.name.trim(),
        guestEmail: customerInfo.email.trim(),
        guestPhone: customerInfo.phone.trim(),
        guestAddress: customerInfo.address.trim(),
        notes: customerInfo.notes.trim() || undefined,
        orders: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      };

      const result = await onSubmitOrder(orderData);

      if (result.success) {
        clearCart();
        router.push(`/order-success${result.orderIds ? `?orderIds=${result.orderIds.join(",")}` : ""}`);
      } else {
        throw new Error(result.error || "Terjadi kesalahan saat memproses pesanan");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Terjadi kesalahan. Silakan coba lagi.";
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="surface-panel text-center p-10 max-w-md w-full">
          <ShoppingBag size={64} className="mx-auto text-amber-400 mb-4" />
          <h2 className="text-3xl text-amber-900 mb-2">Keranjang Kosong</h2>
          <p className="text-amber-900/70 mb-6">Belum ada item di keranjang Anda.</p>
          <button
            onClick={() => router.push("/")}
            className="bg-amber-700 hover:bg-amber-800 text-amber-50 px-6 py-3 rounded-xl transition-colors font-semibold"
          >
            Kembali ke Menu
          </button>
        </div>
      </div>
    );
  }

  const isFormValid =
    customerInfo.name.trim() && customerInfo.phone.trim() && customerInfo.address.trim() && customerInfo.email.trim();

  return (
    <div className="min-h-screen">
      <header className="bg-white/90 backdrop-blur sticky top-0 z-40 border-b border-amber-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <button onClick={() => router.back()} className="p-2 hover:bg-amber-100 rounded-lg transition-colors">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl sm:text-3xl text-amber-950">Checkout</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {submitError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-800 text-sm">{submitError}</p>
              </div>
            )}

            <div className="surface-panel p-4 sm:p-6">
              <h2 className="text-2xl sm:text-3xl text-amber-950 mb-4">Pesanan Anda</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex flex-wrap sm:flex-nowrap items-center gap-3 p-3 sm:p-4 border border-amber-200 rounded-xl bg-white/70">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-300 to-amber-600 rounded-lg overflow-hidden">
                      {item.image ? (
                        <Image
                          src={
                            item.image.startsWith("http")
                              ? item.image
                              : item.image.startsWith("/uploads/")
                                ? item.image
                                : `/uploads/${item.image}`
                          }
                          alt={item.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white text-xs">No Image</div>
                      )}
                    </div>

                    <div className="flex-1 min-w-[140px]">
                      <h3 className="font-semibold text-amber-950 text-sm sm:text-base">{item.name}</h3>
                      <p className="text-sm text-amber-900/80">{formatCurrency(item.price)}</p>
                    </div>

                    <div className="flex items-center gap-1 bg-amber-100 rounded-lg p-1 ml-auto sm:ml-0">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="p-1.5 hover:bg-amber-200 rounded"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="p-1.5 hover:bg-amber-200 rounded"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="text-right ml-auto sm:ml-0">
                      <p className="font-semibold text-amber-950">{formatCurrency(item.price * item.quantity)}</p>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 mt-1">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="surface-panel p-4 sm:p-6">
              <h2 className="text-2xl sm:text-3xl text-amber-950 mb-4">Informasi Pengiriman</h2>
              <form onSubmit={handleSubmitOrder} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-amber-900 mb-1">Nama Lengkap *</label>
                    <input
                      type="text"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-amber-200 rounded-xl bg-white"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-amber-900 mb-1">Nomor Telepon *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-amber-200 rounded-xl bg-white"
                      placeholder="08xxxxxxxxxx"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-amber-900 mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-amber-200 rounded-xl bg-white"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-amber-900 mb-1">Nomor Meja *</label>
                  <textarea
                    name="address"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-amber-200 rounded-xl bg-white"
                    placeholder="Masukkan nomor meja"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-amber-900 mb-1">Catatan Tambahan</label>
                  <textarea
                    name="notes"
                    value={customerInfo.notes}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-3 py-2 border border-amber-200 rounded-xl bg-white"
                    placeholder="Contoh: tanpa es batu"
                  />
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="surface-panel p-4 sm:p-6 lg:sticky lg:top-24">
              <h2 className="text-2xl sm:text-3xl text-amber-950 mb-4">Ringkasan Pesanan</h2>
              <div className="space-y-3 mb-4 text-amber-900">
                <div className="flex justify-between">
                  <span>Subtotal ({cartItems.length} item)</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Biaya Pengiriman</span>
                  <span>{formatCurrency(deliveryFee)}</span>
                </div>
                <hr className="border-amber-200" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-amber-700">{formatCurrency(total)}</span>
                </div>
              </div>

              <div className="mb-6 text-sm text-amber-900/80">
                <p className="mb-1">
                  Pembayaran: <span className="font-semibold">Bayar di Tempat (COD)</span>
                </p>
                <p className="text-xs">Pembayaran dilakukan saat pesanan diterima.</p>
              </div>

              <button
                onClick={() => handleSubmitOrder()}
                disabled={isSubmitting || !isFormValid}
                className="w-full bg-amber-700 hover:bg-amber-800 disabled:bg-gray-400 text-amber-50 py-3 rounded-xl font-semibold transition-colors"
              >
                {isSubmitting ? "Memproses..." : `Pesan Sekarang - ${formatCurrency(total)}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
