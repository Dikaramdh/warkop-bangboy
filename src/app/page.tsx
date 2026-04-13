import { MenuItem } from "@/components/menuItem";
import { ChevronDown, Clock3, Coffee, MapPin } from "lucide-react";
import Image from "next/image";
import { CartButton } from "@/components/cartButton";
import Link from "next/link";
import { getProducts } from "@/lib/action/product";

export default async function Home() {
  const product = await getProducts();

  return (
    <main className="overflow-x-hidden">
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,239,213,.5),transparent_35%),radial-gradient(circle_at_90%_15%,rgba(255,209,148,.45),transparent_28%)] z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000 scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-amber-950/80 via-amber-900/70 to-amber-950/90 z-10" />

        <div className="relative z-20 text-center text-amber-50 px-4 max-w-5xl mx-auto pt-20">
          <p className="inline-flex rounded-full border border-amber-200/40 bg-amber-100/10 px-4 py-1 text-sm tracking-wide mb-6">
            Kopi Asli, Suasana Hangat
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold mb-6 animate-fade-in leading-tight">
            Warkop <span className="text-amber-300">Bangboy</span>
          </h1>
          <p className="text-lg md:text-2xl mb-10 text-amber-100/90 max-w-3xl mx-auto">
            Nikmati menu spesial yang diracik untuk momen santai bareng teman, keluarga, dan obrolan panjang.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/menu-list"
              className="bg-amber-500 hover:bg-amber-400 text-amber-950 px-8 py-3 rounded-full font-semibold transition-all duration-200 transform hover:-translate-y-1"
            >
              Lihat Menu
            </Link>
            <Link
              href="#about"
              className="border border-amber-100/60 text-amber-50 hover:bg-amber-100/15 px-8 py-3 rounded-full font-semibold transition-all duration-200"
            >
              Tentang Kami
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 floating">
          <ChevronDown className="h-8 w-8 text-amber-100" />
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="surface-panel text-center p-7">
              <Coffee className="h-14 w-14 text-amber-700 mx-auto mb-4" />
              <h3 className="text-2xl mb-2">Kopi Premium</h3>
              <p className="text-amber-900/70">Racikan pilihan dengan rasa khas.</p>
            </div>
            <div className="surface-panel text-center p-7">
              <Clock3 className="h-14 w-14 text-amber-700 mx-auto mb-4" />
              <h3 className="text-2xl mb-2">Buka 24 Jam</h3>
              <p className="text-amber-900/70">Siap melayani kapan pun kamu butuh kopi.</p>
            </div>
            <div className="surface-panel text-center p-7">
              <MapPin className="h-14 w-14 text-amber-700 mx-auto mb-4" />
              <h3 className="text-2xl mb-2">Lokasi Strategis</h3>
              <p className="text-amber-900/70">Mudah dijangkau dari berbagai arah.</p>
            </div>
          </div>
        </div>
      </section>

      <MenuItem menuItems={product} />
      <CartButton />

      <section id="about" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="surface-panel p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
              <h2 className="text-3xl md:text-5xl text-amber-950 mb-6">Tentang Warkop Bangboy</h2>
                <p className="text-amber-900/80 mb-6 text-lg leading-relaxed">
                  Sejak 2018, Warkop Bangboy menjadi tempat favorit remaja dan keluarga buat kumpul, ngobrol, dan menikmati
                  menu autentik dengan budget ramah.
                </p>
                <p className="text-amber-900/80 mb-8 text-lg leading-relaxed">
                  Kami percaya pengalaman ngopi terbaik itu bukan cuma rasa, tapi juga suasana yang hangat dan pelayanan yang
                  bikin ingin balik lagi.
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-amber-700">7+</div>
                    <div className="text-sm text-amber-900/70">Tahun</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-amber-700">1K+</div>
                    <div className="text-sm text-amber-900/70">Pelanggan</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-amber-700">10+</div>
                    <div className="text-sm text-amber-900/70">Varian Menu</div>
                  </div>
                </div>
              </div>

              <div className="relative pb-0 sm:pb-10">
                <div className="rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
                  <Image
                    src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Interior Warkop"
                    className="w-full h-72 sm:h-[24rem] object-cover"
                    width={900}
                    height={700}
                  />
                </div>
                <div className="mt-4 sm:mt-0 sm:absolute sm:-bottom-5 sm:-right-5 bg-amber-600 text-amber-50 p-4 sm:p-5 rounded-2xl shadow-lg w-full sm:w-auto text-center sm:text-left">
                  <div className="text-2xl font-bold">4.8 / 5</div>
                  <div className="text-sm">Rating Pelanggan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
