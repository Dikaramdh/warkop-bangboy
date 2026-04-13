"use client";

import Image from "next/image";
import { useCart, CartItem } from "@/components/cartContext";

interface MenuItemProps {
  menuItems: Partial<CartItem>[];
}

export const MenuItem = ({ menuItems }: MenuItemProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (item: Partial<CartItem>) => {
    if (!item.id || !item.name || typeof item.price !== "number") {
      console.error("Produk tidak valid:", item);
      return;
    }

    const newProduct: CartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      desc: item.desc ?? null,
      image: item.image ?? null,
      quantity: 1,
    };

    addToCart(newProduct);
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section id="menu" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl text-amber-950 mb-4">Menu Spesial Kami</h2>
          <p className="text-amber-900/70 max-w-2xl mx-auto">Pilihan menu favorit yang bikin nongkrong makin seru.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {menuItems.map((item, index) => (
            <article
              key={item.id ?? index}
              className="rounded-2xl border border-amber-200 bg-white/95 shadow-[0_10px_32px_rgba(146,64,14,0.1)] overflow-hidden hover:-translate-y-1 transition-all duration-200"
            >
              <div className="h-32 sm:h-52 bg-gradient-to-br from-amber-300 to-orange-500 relative overflow-hidden">
                {item.image ? (
                  <Image
                    className="w-full h-32 sm:h-52 object-cover hover:scale-105 transition-transform duration-300"
                    src={
                      item.image?.startsWith("http")
                        ? item.image
                        : item.image?.startsWith("/uploads/")
                          ? item.image
                          : `/uploads/${item.image}`
                    }
                    alt={item.name ?? "Menu item"}
                    width={480}
                    height={220}
                    priority={index < 3}
                  />
                ) : (
                    <div className="w-full h-32 sm:h-52 flex items-center justify-center text-amber-50 font-semibold text-xs sm:text-lg">No Image Available</div>
                )}
              </div>

              <div className="p-3 sm:p-6">
                <h3 className="text-sm sm:text-2xl text-amber-950 line-clamp-2 mb-1">{item.name ?? "Tanpa Nama"}</h3>
                <span className="block text-sm sm:text-lg font-bold text-amber-700 mb-2">{formatPrice(item.price ?? 0)}</span>

                <p className="text-xs sm:text-base text-amber-900/70 mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">{item.desc ?? "Deskripsi tidak tersedia"}</p>

                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full bg-amber-700 hover:bg-amber-800 text-amber-50 py-2 sm:py-3 px-2 sm:px-4 rounded-lg sm:rounded-xl transition-all duration-200 font-semibold text-xs sm:text-base"
                >
                  Tambah ke Keranjang
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
