import ChatService from "../api/ChatService";
import useCustomQuery from "../../../share/hooks/useCustomQuery";

export const useQueryGetChatUserList = () => {
  return useCustomQuery(
    ["chatUser"],
    () => ChatService.getChatUserList(),
    (res) => res.data
  );
};
