import { Suspense } from "react";
import { MenuList } from "@/components/MenuList";
import { CartButton } from "@/components/cartButton";
import { getProducts } from "@/lib/action/product";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu List - Warkop Bangboy",
  description: "Jelajahi menu favorit Warkop Bangboy",
};

function MenuListSkeleton() {
  return (
    <div className="min-h-screen bg-transparent">
      <header className="bg-white/80 backdrop-blur border-b border-amber-200">
        <div className="container mx-auto px-4 py-6">
          <div className="animate-pulse">
            <div className="h-8 bg-amber-100 rounded w-48" />
            <div className="h-4 bg-amber-100 rounded w-64 mt-2" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-amber-200 shadow-sm overflow-hidden animate-pulse">
              <div className="h-48 bg-amber-100" />
              <div className="p-4">
                <div className="h-6 bg-amber-100 rounded w-3/4 mb-2" />
                <div className="h-4 bg-amber-100 rounded w-1/2 mb-2" />
                <div className="h-4 bg-amber-100 rounded w-full mb-4" />
                <div className="h-10 bg-amber-100 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

async function MenuListContent() {
  const products = await getProducts();

  return (
    <>
      <MenuList products={products} />
      <CartButton />
    </>
  );
}

export default function MenuListPage() {
  return (
    <Suspense fallback={<MenuListSkeleton />}>
      <MenuListContent />
    </Suspense>
  );
}
