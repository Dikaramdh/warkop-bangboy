import { LoginForm } from "@/components/loginForm";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="surface-panel p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.2em] text-amber-700 mb-2">Admin Area</p>
          <h2 className="text-4xl text-amber-950 mb-2">Masuk ke dashboard</h2>
          <p className="text-amber-900/70 mb-6">Gunakan akun admin untuk mengelola menu dan pesanan.</p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
