import useCustomQuery from "../../../share/hooks/useCustomQuery";
import ChatService from "../api/ChatService";

export const useQueryGetChatUserList = () => {
  return useCustomQuery(
    ["chatUser"],
    () => ChatService.getChatUserList(),
    (res) => res.data
  );
};
