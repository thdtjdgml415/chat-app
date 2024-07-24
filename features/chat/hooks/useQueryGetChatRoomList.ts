import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import ChatService from "../api/ChatService";
import { ChatRoomProps, Room } from "../model/chat";

export const useQueryGetChatRoomList = () => {
  const { data, error, isPending, isLoading } = useQuery<
    ChatRoomProps,
    AxiosError
  >({
    queryKey: ["room"],
    queryFn: () => ChatService.getChatRoomList(),
  });

  return { data, error, isPending, isLoading };
};
