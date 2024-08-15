import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ChatRoomProps } from "../model/chat";
import { fetchChatRooms } from "../api/ChatService";
import useCustomQuery from "@/share/hooks/useCustomQuery";

export const useQueryGetChatRoomList = () => {
  return useCustomQuery(
    ["room"],
    () => fetchChatRooms(),
    (res) => res.data
  );
};
