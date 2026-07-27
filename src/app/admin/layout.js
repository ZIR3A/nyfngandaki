import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";

export default async function AdminLayout({ children }) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <AdminShell user={session.user}>
      {children}
    </AdminShell>
  );
}
