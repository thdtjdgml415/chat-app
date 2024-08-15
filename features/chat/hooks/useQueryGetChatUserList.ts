import useCustomQuery from "../../../share/hooks/useCustomQuery";
import { fetchChatUserList } from "../api/ChatService";

export const useQueryGetChatUserList = () => {
  return useCustomQuery(
    ["chatUser"],
    () => fetchChatUserList(),
    (res) => res.data
  );
};
