import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";
import DeleteProductButton from "@/components/deleteProductButton";
import Image from "next/image";
import { getProducts } from "@/lib/action/product";

async function getUsers() {
  return await prisma.user.findMany({
    select: {
      id: true,
    },
  });
}

export default async function ProductsPage() {
  const products = await getProducts();
  const users = await getUsers();
  const adminId = users[0]?.id;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <h1 className="text-3xl sm:text-5xl text-amber-950 mb-2">Products</h1>
          <p className="text-amber-900/70">Kelola daftar produk yang tampil di menu pelanggan.</p>
        </div>
        <Button asChild>
          <Link href={`/dashboard/${adminId}/products/create`}>Add Product</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Products List</CardTitle>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <p className="text-amber-900/70 text-center py-8">No products found</p>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-3 md:hidden">
                {products.map((product) => (
                  <div key={product.id} className="rounded-xl border border-amber-200 bg-amber-50/40 p-3">
                    <div className="flex gap-3">
                      <Image
                        src={
                          product.image?.startsWith("http")
                            ? product.image
                            : product.image?.startsWith("/uploads/")
                              ? product.image
                              : `/uploads/${product.image}`
                        }
                        alt={product.name}
                        width={72}
                        height={72}
                        className="rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-amber-950 truncate">{product.name}</p>
                        <p className="text-sm text-amber-900/80">{formatCurrency(product.price)}</p>
                        <p className="text-xs text-amber-900/70 line-clamp-2 mt-1">{product.desc || "-"}</p>
                        <p className="text-xs text-amber-900/60 mt-1">{formatDate(product.createdAt)}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/dashboard/${adminId}/products/${product.id}/edit`}>Edit</Link>
                      </Button>
                      <DeleteProductButton id={product.id} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="hidden md:block overflow-x-auto rounded-xl border border-amber-200">
              <table className="w-full border-collapse text-sm min-w-[760px]">
                <thead>
                  <tr className="border-b border-amber-200 bg-amber-100 text-amber-900">
                    <th className="text-left p-3">Image</th>
                    <th className="text-left p-3">Name</th>
                    <th className="text-left p-3">Price</th>
                    <th className="text-left p-3">Description</th>
                    <th className="text-left p-3">Created</th>
                    <th className="text-left p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-amber-100 hover:bg-amber-50/70">
                      <td className="p-3 font-medium">
                        <Image
                          src={
                            product.image?.startsWith("http")
                              ? product.image
                              : product.image?.startsWith("/uploads/")
                                ? product.image
                                : `/uploads/${product.image}`
                          }
                          alt={product.name}
                          width={88}
                          height={88}
                          className="rounded-lg object-cover"
                        />
                      </td>
                      <td className="p-3 font-medium text-amber-950">{product.name}</td>
                      <td className="p-3">{formatCurrency(product.price)}</td>
                      <td className="p-3">{product.desc || "-"}</td>
                      <td className="p-3">{formatDate(product.createdAt)}</td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" asChild>
                            <Link href={`/dashboard/${adminId}/products/${product.id}/edit`}>Edit</Link>
                          </Button>
                          <DeleteProductButton id={product.id} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
