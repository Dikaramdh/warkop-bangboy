import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

async function getOrders() {
  return await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      product: true,
    },
  });
}

export default async function OrderPage() {
  const orders = await getOrders();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl sm:text-5xl text-amber-950 mb-2">Orders</h1>
        <p className="text-amber-900/70">Daftar pesanan terbaru pelanggan.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Orders Table</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 md:hidden">
            {orders.map((order) => (
              <div key={order.id} className="rounded-xl border border-amber-200 bg-amber-50/40 p-3">
                <p className="text-xs text-amber-900/60 mb-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                <p className="font-semibold text-amber-950 truncate">{order.guestName}</p>
                <p className="text-sm text-amber-900/80 truncate">{order.guestEmail}</p>
                <p className="text-sm text-amber-900/80">{order.guestPhone}</p>
                <p className="text-sm text-amber-900/80 mt-1 line-clamp-2">{order.guestAddress}</p>
                <div className="mt-2 text-sm">
                  <p className="text-amber-900"><span className="font-medium">Produk:</span> {order.product?.name || "-"}</p>
                  <p className="text-amber-900"><span className="font-medium">Harga:</span> Rp {order.product?.price?.toLocaleString() || "-"}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:block overflow-x-auto rounded-xl border border-amber-200">
            <table className="w-full text-sm min-w-[980px]">
              <thead>
                <tr className="bg-amber-100 text-left text-amber-900">
                  <th className="px-4 py-3 border-b border-amber-200">Order ID</th>
                  <th className="px-4 py-3 border-b border-amber-200">Guest ID</th>
                  <th className="px-4 py-3 border-b border-amber-200">Nama</th>
                  <th className="px-4 py-3 border-b border-amber-200">Email</th>
                  <th className="px-4 py-3 border-b border-amber-200">Telepon</th>
                  <th className="px-4 py-3 border-b border-amber-200">Alamat/Meja</th>
                  <th className="px-4 py-3 border-b border-amber-200">Produk</th>
                  <th className="px-4 py-3 border-b border-amber-200">Harga</th>
                  <th className="px-4 py-3 border-b border-amber-200">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-amber-50/70">
                    <td className="px-4 py-2 border-b border-amber-100">{order.id}</td>
                    <td className="px-4 py-2 border-b border-amber-100">{order.guestId || "-"}</td>
                    <td className="px-4 py-2 border-b border-amber-100">{order.guestName}</td>
                    <td className="px-4 py-2 border-b border-amber-100">{order.guestEmail}</td>
                    <td className="px-4 py-2 border-b border-amber-100">{order.guestPhone}</td>
                    <td className="px-4 py-2 border-b border-amber-100">{order.guestAddress}</td>
                    <td className="px-4 py-2 border-b border-amber-100">{order.product?.name || "-"}</td>
                    <td className="px-4 py-2 border-b border-amber-100">Rp {order.product?.price?.toLocaleString() || "-"}</td>
                    <td className="px-4 py-2 border-b border-amber-100">{new Date(order.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
