// File: src/app/layout.tsx
import type { Metadata } from "next";
import "../globals.css"; // Import global styles
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Dasboard POS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex h-screen bg-gray-100 text-blue-600">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </body>
    </html>
  );
}
