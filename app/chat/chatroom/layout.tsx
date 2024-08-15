import Loading from "@/app/loading";
import { Suspense } from "react";

export default async function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
