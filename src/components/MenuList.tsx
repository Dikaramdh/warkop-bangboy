"use client";

import { useState } from "react";
import { useCart } from "@/components/cartContext";
import { formatCurrency } from "@/lib/utils";
import { Plus, Minus, ShoppingCart, Search, Filter } from "lucide-react";
import Image from "next/image";
import { toast } from "react-hot-toast";

interface Product {
  id: string;
  name: string;
  price: number;
  desc?: string | null;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface MenuListProps {
  products: Product[];
}

type PriceFilter = "all" | "low" | "medium" | "high";
type SortBy = "name" | "price" | "newest";

export function MenuList({ products }: MenuListProps) {
  const { addToCart, getCartItemQuantity, updateQuantity } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all");
  const [sortBy, setSortBy] = useState<SortBy>("name");

  const filteredProducts = products.filter((product) => {
    const lowerSearch = searchTerm.toLowerCase();
    const matchesSearch =
      product.name.toLowerCase().includes(lowerSearch) || product.desc?.toLowerCase().includes(lowerSearch);

    let matchesPrice = true;
    if (priceFilter === "low") matchesPrice = product.price < 50000;
    else if (priceFilter === "medium") matchesPrice = product.price >= 50000 && product.price < 100000;
    else if (priceFilter === "high") matchesPrice = product.price >= 100000;

    return matchesSearch && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    return 0;
  });

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image ?? null,
      desc: product.desc ?? null,
      quantity: 1,
    });
    toast.success(`${product.name} ditambahkan ke keranjang!`);
  };

  return (
    <div className="min-h-screen bg-transparent">
      <header className="bg-white/90 backdrop-blur sticky top-0 z-40 border-b border-amber-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl text-amber-950">Menu Kami</h1>
              <p className="text-amber-900/70 mt-1">Pilih makanan dan minuman favorit Anda</p>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500" size={20} />
              <input
                type="text"
                placeholder="Cari menu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-500/35 focus:border-amber-400 w-full md:w-72 bg-amber-50/50"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-amber-100">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-100/60 text-amber-900">
              <Filter size={16} />
              <span className="text-sm font-semibold">Filter</span>
            </div>

            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value as PriceFilter)}
              className="px-3 py-2 border border-amber-200 rounded-xl text-sm bg-white"
            >
              <option value="all">Semua Harga</option>
              <option value="low">Di bawah Rp 50.000</option>
              <option value="medium">Rp 50.000 - Rp 100.000</option>
              <option value="high">Di atas Rp 100.000</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className="px-3 py-2 border border-amber-200 rounded-xl text-sm bg-white"
            >
              <option value="name">Urutkan A-Z</option>
              <option value="price">Harga Terendah</option>
              <option value="newest">Terbaru</option>
            </select>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 rounded-xl bg-amber-100/50 border border-amber-200 px-4 py-2 text-amber-900">
          Menampilkan {sortedProducts.length} dari {products.length} menu
        </div>

        {sortedProducts.length === 0 ? (
          <div className="text-center py-16 surface-panel max-w-xl mx-auto">
            <Search size={64} className="mx-auto text-amber-400 mb-4" />
            <h3 className="text-2xl text-amber-900 mb-2">Menu tidak ditemukan</h3>
            <p className="text-amber-900/70">Coba kata kunci lain atau ubah filter pencarian.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {sortedProducts.map((product, index) => {
              const cartQuantity = getCartItemQuantity(product.id);

              return (
                <article key={product.id} className="rounded-xl sm:rounded-2xl border border-amber-200 bg-white/95 shadow-sm overflow-hidden hover:shadow-lg transition-all">
                  <div className="h-32 sm:h-48 w-full relative group bg-amber-100">
                    {product.image ? (
                      <>
                        <Image
                          src={
                            product.image?.startsWith("http")
                              ? product.image
                              : product.image?.startsWith("/uploads/")
                                ? product.image
                                : `/uploads/${product.image}`
                          }
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover transition-transform duration-200 group-hover:scale-105"
                          priority={index < 4}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-amber-50 bg-gradient-to-br from-amber-500 to-orange-500">
                        <div className="text-center">
                          <ShoppingCart size={24} className="mx-auto mb-1 sm:mb-2" />
                          <span className="text-sm">No Image</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-3 sm:p-4">
                    <h3 className="text-sm sm:text-2xl text-amber-950 mb-1 line-clamp-2">{product.name}</h3>
                    <p className="text-sm sm:text-xl font-bold text-amber-700 mb-2">{formatCurrency(product.price)}</p>

                    {product.desc && <p className="text-amber-900/70 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">{product.desc}</p>}

                    <div className="flex items-center justify-between">
                      {cartQuantity === 0 ? (
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="flex-1 bg-amber-700 hover:bg-amber-800 text-amber-50 py-2 sm:py-2.5 px-2 sm:px-4 rounded-lg sm:rounded-xl font-semibold transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                        >
                          <Plus size={16} />
                          Tambah
                        </button>
                      ) : (
                        <div className="flex-1 flex items-center justify-between bg-amber-100 rounded-xl p-1">
                          <button
                            onClick={() => updateQuantity(product.id, cartQuantity - 1)}
                            className="p-1 hover:bg-amber-200 rounded-lg transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-semibold px-3">{cartQuantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, cartQuantity + 1)}
                            className="p-1 hover:bg-amber-200 rounded-lg transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
