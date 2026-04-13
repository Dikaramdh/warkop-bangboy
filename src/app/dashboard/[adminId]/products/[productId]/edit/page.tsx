import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/productForm";

async function getProduct(productId: string) {
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    notFound();
  }

  return product;
}

interface PageProps {
  params: Promise<{ productId: string; adminId: string }>;
}

export default async function EditProductPage({ params }: PageProps) {
  const { productId } = await params;
  const product = await getProduct(productId);

  return (
    <div className="space-y-3">
      <h1 className="text-3xl sm:text-5xl text-amber-950">Edit Product</h1>
      <p className="text-amber-900/70">Perbarui detail produk agar tetap akurat dan menarik.</p>
      <ProductForm product={product} isEdit={true} />
    </div>
  );
}
