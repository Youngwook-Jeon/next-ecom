import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import AdminSidebar from "@components/AdminSidebar";

interface Props {
  children: ReactNode;
}

export default async function AdminLayout({ children }: Props) {
  const session = await auth();
  if (!session) return redirect("/auth/signin");

  const user = session.user;
  const isAdmin = user?.role === "admin";
  if (!isAdmin) return redirect("/auth/signin");

  return <AdminSidebar>{children}</AdminSidebar>;
}
