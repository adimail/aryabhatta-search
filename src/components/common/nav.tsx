import Link from "next/link";
import { auth } from "@/server/auth";
import { AuthButtons } from "./auth-buttons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { IoMenu } from "react-icons/io5";

export const Nav = async () => {
  const session = await auth();

  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-3 py-4 md:py-6">
        <Sheet>
          <SheetTrigger>
            <IoMenu size={30} />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Are you absolutely sure?</SheetTitle>
              <SheetDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <Link href="/" className="flex items-center">
          <h1 className="text-lg font-bold md:text-2xl">Aryabhatta Search</h1>
        </Link>
        <AuthButtons session={session} />
      </div>
    </header>
  );
};
