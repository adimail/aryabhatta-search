"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const NavTitle = () => {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <Link href="/" className="flex items-center">
      <h1 className="text-lg font-bold md:text-2xl">Aryabhatta Search</h1>
    </Link>
  );
};
