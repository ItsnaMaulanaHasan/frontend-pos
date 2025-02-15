"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white shadow-lg p-4">
      <h1 className="text-xl font-bold mb-4">b square</h1>
      <ul className="space-y-2">
        <li>
          <Link href="/">
            <span className={`block p-2 rounded-lg ${pathname === "/" ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link href="/customer">
            <span className={`block p-2 rounded-lg ${pathname === "/customer" ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}>Customer</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
