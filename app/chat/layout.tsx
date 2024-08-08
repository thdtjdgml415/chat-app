import ChatService from "@/features/chat/api/ChatService";
import { SideMenu } from "@/widget/side-menu/side-menu";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import Loading from "../loading";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 데이터 낙관적으로 불러오기
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["room"],
    queryFn: () => ChatService.getChatRoomList(),
  });

  await queryClient.prefetchQuery({
    queryKey: ["chatUser"],
    queryFn: () => ChatService.getChatUserList(),
  });

  return (
    <Suspense fallback={<Loading />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="flex">
          <SideMenu />
          {children}
        </div>
      </HydrationBoundary>
    </Suspense>
  );
}
