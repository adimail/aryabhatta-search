import Link from "next/link";
import { auth } from "@/server/auth";
import { AuthButtons } from "./auth-buttons";

export const Nav = async () => {
  const session = await auth();

  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-3 py-4 md:py-6">
        <Link href="/" className="flex items-center">
          <h1 className="text-lg font-bold md:text-2xl">Aryabhatta Search</h1>
        </Link>
        <AuthButtons userImage={session?.user?.image} />
      </div>
    </header>
  );
};
