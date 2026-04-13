export const metadata = {
  title: "Menu Kami",
  description: "Pilih makanan favorit Anda",
};

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen">{children}</div>;
}
