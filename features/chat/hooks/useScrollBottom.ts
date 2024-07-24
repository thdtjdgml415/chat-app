import { useEffect } from "react";
import { MessageDataProps } from "../model/chat";

const useScrollBottom = ({
  messagesEndRef,
  messages,
}: {
  messagesEndRef: any;
  messages: MessageDataProps[];
}) => {
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
};
export default useScrollBottom;
