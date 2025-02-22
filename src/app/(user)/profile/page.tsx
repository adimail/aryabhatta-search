import React from "react";
import { type Metadata } from "next";
import { UserProfile } from "@/modules/profile";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `User Profile`,
  };
}

export default async function ProfilePage() {
  return (
    <main className="container mx-auto p-5">
      <UserProfile />
    </main>
  );
}
