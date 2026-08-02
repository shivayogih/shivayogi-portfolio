import type { Metadata } from "next";
import { AdminEditor } from "@/components/admin/admin-editor";

export const metadata: Metadata = {
  title: "Portfolio admin",
  description: "Private publishing workspace for the Shivayogi Hiremath portfolio.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminEditor />;
}
