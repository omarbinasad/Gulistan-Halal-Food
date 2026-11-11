import type { Metadata } from "next";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Admin" },
  robots: { index: false, follow: false },
};

// NOTE: no access control yet — admin auth arrives with the backend.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-secondary/40">
      <AdminSidebar />
      <div className="lg:pl-64">
        <AdminHeader />
        <main className="mx-auto w-full max-w-[1580px] p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
