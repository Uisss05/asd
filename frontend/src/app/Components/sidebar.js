"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Typography } from "@material-tailwind/react";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { title: "Artikel", href: "../Admin/artikel" },
    { title: "Kisah Islami", href: "../Admin/kisahIslami" },
    { title: "Quotes", href: "../Admin/Quotes" },
  ];

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white p-4">
      <Typography variant="h5" className="mb-6 text-center">
        Admin Dashboard
      </Typography>
      <nav>
        <ul className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <li key={item.title}>
              <Link href={item.href} className={`block p-2 rounded hover:bg-gray-700 transition ${pathname === item.href ? "bg-gray-700" : ""}`}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
