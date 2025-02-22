"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";

interface AuthButtonsProps {
  session: {
    user?: {
      id: string | null;
      image?: string | null;
      name?: string | null;
      email?: string | null;
    };
  } | null;
}

export const AuthButtons = ({ session }: AuthButtonsProps) => {
  if (session?.user?.image) {
    return (
      <div className="flex items-center gap-4">
        <Popover>
          <PopoverTrigger>
            <Image
              src={session.user.image}
              alt="Profile"
              width={40}
              height={40}
              className="cursor-pointer rounded-full"
            />
          </PopoverTrigger>
          <PopoverContent>
            <div className="p-1">
              {session.user.name && (
                <p className="font-semibold text-gray-800 dark:text-gray-100">
                  {session.user.name}
                </p>
              )}
              {session.user.email && (
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {session.user.email}
                </p>
              )}
              <Link href={`/u/${session.user.id}`}>
                <button className="mt-2 w-full rounded-md bg-gray-500 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700">
                  Profile
                </button>
              </Link>
              <Link href="/history">
                <button className="mt-2 w-full rounded-md bg-gray-500 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700">
                  History
                </button>
              </Link>
              <button
                onClick={() => signOut()}
                className="mt-2 w-full rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Sign out
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("google")}
      className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
    >
      Sign in
    </button>
  );
};
