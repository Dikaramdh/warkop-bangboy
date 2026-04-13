"use client";

import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/cartContext";
import { useRouter } from "next/navigation";

export const CartButton = () => {
  const { getTotalItems } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const cartCount = getTotalItems();

  const router = useRouter();

  const handleCartClick = () => {
    router.push("/checkout");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleCartClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative w-16 h-16 rounded-full
          bg-gradient-to-br from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700
          text-amber-50 shadow-[0_12px_25px_rgba(146,64,14,0.35)] hover:shadow-[0_16px_35px_rgba(146,64,14,0.45)]
          transition-all duration-300 ease-in-out transform hover:scale-110
          flex items-center justify-center group
          ${isHovered ? "animate-pulse" : ""}
        `}
      >
        <ShoppingCart size={24} className="transition-transform duration-200 group-hover:scale-110" />

        {cartCount > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
            {cartCount > 99 ? "99+" : cartCount}
          </div>
        )}

        <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-15 transition-opacity duration-200" />
      </button>

      <div
        className={`
          absolute bottom-full right-0 mb-2
          bg-amber-950 text-amber-50 text-sm px-3 py-1.5 rounded-lg whitespace-nowrap
          transition-all duration-200
          ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"}
        `}
      >
        Keranjang ({cartCount})
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-amber-950" />
      </div>
    </div>
  );
};
