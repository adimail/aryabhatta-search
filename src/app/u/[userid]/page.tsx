import React from "react";
import { type Metadata } from "next";
import { UserProfile } from "@/modules/profile/userProfile";

interface UserPageProps {
  params: Promise<{ userid: string }>;
}

export async function generateMetadata({
  params,
}: UserPageProps): Promise<Metadata> {
  const { userid } = await params;
  return {
    title: `User ${userid}`,
  };
}

export default async function UserPage({ params }: UserPageProps) {
  const { userid } = await params;
  return (
    <main className="container mx-auto p-5">
      <UserProfile userid={userid} />
    </main>
  );
}
