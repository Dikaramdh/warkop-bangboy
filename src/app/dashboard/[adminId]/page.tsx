import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

async function getDashboardStats() {
  const [productCount, userCount, orderCount] = await Promise.all([
    prisma.product.count(),
    prisma.user.count(),
    prisma.order.count(),
  ]);

  return { productCount, userCount, orderCount };
}

export default async function DashboardPage() {
  const { productCount, userCount, orderCount } = await getDashboardStats();

  return (
    <div>
      <h1 className="text-3xl sm:text-5xl text-amber-950 mb-2">Dashboard</h1>
      <p className="text-amber-900/70 mb-8">Ringkasan performa operasional Warkop Bangboy.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-amber-700">{productCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-teal-700">{userCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-orange-700">{orderCount}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
