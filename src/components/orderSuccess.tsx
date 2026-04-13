"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, ArrowLeft, Phone, MessageCircle } from "lucide-react";
import { useMemo } from "react";

export default function OrderSuccess() {
  const router = useRouter();
  const params = useSearchParams();

  const orderCode = useMemo(() => {
    const orderIds = params.get("orderIds");
    if (!orderIds) return "-";

    const firstOrderId = orderIds.split(",")[0]?.trim();
    if (!firstOrderId) return "-";

    return firstOrderId.length > 8 ? firstOrderId.slice(-8).toUpperCase() : firstOrderId.toUpperCase();
  }, [params]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full surface-panel p-8 text-center">
        <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-8 h-8 text-emerald-600" />
        </div>

        <h1 className="text-4xl text-amber-950 mb-2">Pesanan Berhasil</h1>
        <p className="text-amber-900/70 mb-6">Terima kasih, pesanan Anda sudah kami terima dan sedang diproses.</p>

        <div className="bg-amber-100/70 rounded-xl p-4 mb-6 border border-amber-200">
          <p className="text-sm text-amber-900 mb-2">
            <strong>Nomor Pesanan:</strong> #{orderCode}
          </p>
          <p className="text-sm text-amber-900">
            <strong>Estimasi:</strong> 30-45 menit
          </p>
        </div>

        <div className="space-y-3 mb-6 text-sm text-amber-900/80">
          <div className="flex items-center justify-center gap-2">
            <Phone size={16} />
            <span>Tim kami siap bantu jika ada pertanyaan</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <MessageCircle size={16} />
            <span>Silakan hubungi WhatsApp untuk update pesanan</span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => router.push("/")}
            className="w-full bg-amber-700 hover:bg-amber-800 text-amber-50 py-3 rounded-xl transition-colors font-semibold"
          >
            Kembali ke Beranda
          </button>

          <button
            onClick={() => router.back()}
            className="w-full flex items-center justify-center gap-2 text-amber-700 hover:text-amber-800 py-2 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Kembali</span>
          </button>
        </div>
      </div>
    </div>
  );
}
