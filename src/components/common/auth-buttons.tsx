"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

interface AuthButtonsProps {
  userImage?: string | null;
}

export const AuthButtons = ({ userImage }: AuthButtonsProps) => {
  if (userImage) {
    return (
      <div className="flex items-center gap-4">
        <Image
          src={userImage}
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full"
        />
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
