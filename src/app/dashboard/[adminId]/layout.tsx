import { prisma } from "@/lib/prisma";
import Sidebar from "@/components/sidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const data = await prisma.user.findMany();
  const adminId = data[0]?.id;

  const navigation = [
    { name: "Dashboard", href: `/dashboard/${adminId}` },
    { name: "Products", href: `/dashboard/${adminId}/products` },
    { name: "Orders", href: `/dashboard/${adminId}/order` },
  ];

  return (
    <div className="flex min-h-screen bg-[linear-gradient(180deg,#fffdf7_0%,#fff7ea_55%,#fff3e0_100%)]">
      <Sidebar navigation={navigation} />
      <main className="flex-1 overflow-y-auto p-6 md:p-8">{children}</main>
    </div>
  );
}
