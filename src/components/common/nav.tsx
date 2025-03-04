import Link from "next/link";
import { auth } from "@/server/auth";
import { AuthButtons } from "./auth-buttons";
import { NavTitle } from "./navtitle";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IoMenu } from "react-icons/io5";
import {
  MessageSquare,
  GraduationCap,
  Book,
  History,
  Home,
  Info,
} from "lucide-react";

const NavLinks = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Discussion",
    href: "/discussion",
    icon: MessageSquare,
  },
  // {
  //   name: "3D Gallery",
  //   href: "/gallery",
  //   icon: Box,
  // },
  {
    name: "Tests",
    href: "/tests",
    icon: GraduationCap,
  },
  {
    name: "Book Recommendations",
    href: "/books",
    icon: Book,
  },
  {
    name: "Search History",
    href: "/history",
    icon: History,
  },
  {
    name: "About",
    href: "/about",
    icon: Info,
  },
];

export const Nav = async () => {
  const session = await auth();

  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-white shadow-md">
      <div className="mx-auto flex max-w-[1700px] items-center justify-between px-6 py-4">
        <Sheet>
          <SheetTrigger>
            <IoMenu size={30} />
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px]">
            <SheetHeader className="mb-6">
              <Link href="/" className="flex items-center">
                <h1 className="text-xl font-bold">Aryabhatta Search</h1>
              </Link>
            </SheetHeader>
            <nav className="flex flex-col space-y-4">
              {NavLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition-all hover:bg-gray-100"
                  >
                    <Icon className="h-5 w-5" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>

        <NavTitle />
        <AuthButtons session={session} />
      </div>
    </header>
  );
};
