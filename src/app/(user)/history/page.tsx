import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import { HistoryPage } from "@/modules/history/historypage";

export default async function History() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  return <HistoryPage userId={session.user.id} />;
} 