import ProductForm from "@/components/productForm";

export default function CreateProductPage() {
  return (
    <div className="space-y-3">
      <h1 className="text-3xl sm:text-5xl text-amber-950">Create Product</h1>
      <p className="text-amber-900/70">Tambahkan menu baru untuk ditampilkan di halaman pelanggan.</p>
      <ProductForm />
    </div>
  );
}
