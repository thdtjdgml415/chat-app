import { SideMenu } from "@/widget/side-menu/side-menu";
import { Suspense } from "react";
import Loading from "../loading";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<Loading />}>
      <div className="flex">
        <SideMenu />
        {children}
      </div>
    </Suspense>
  );
}
