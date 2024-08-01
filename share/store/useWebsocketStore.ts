import { Client, StompSubscription } from "@stomp/stompjs";

import { MessageDataProps } from "@/features/chat/model/chat";
import { QueryClient } from "@tanstack/react-query";
import { create } from "zustand";
import useMessageStore from "./useMessageStore";
import { useModalStore } from "./useModalStore";

export interface RoomDataProps {
  creator: string;
  roomType: string;
  participant: string[];
  roomId: any;
  title?: string;
}

interface useWebsocketStoreProps {
  client: Client | null;

  currentRoomId: string | null;
  currentSubscription: StompSubscription | null;

  connect: () => void;
  disconnect: () => void;
  subscribePublic: () => void;
  subscribeToRoom: (roomId: string) => void;
  unsubscribeFromRoom: () => void;
  sendMessage: (roomId: string, data: string) => void;
  createChatRoom: (data: RoomDataProps) => void;
}

// WebSocket 스토어 정의
export const useWebSocketStore = create<useWebsocketStoreProps>((set, get) => ({
  client: null as Client | null,
  currentRoomId: null,
  currentSubscription: null,

  connect: () => {
    const client = new Client({
      brokerURL: `ws://43.203.222.95:8080/ws/chat`,
      connectHeaders: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      onConnect: () => {
        console.log("Connected to WebSocket server!");
        set({ client });
        if (client && client.connected) {
          get().subscribePublic();
        }
      },
      onDisconnect: () => {
        console.log("Disconnected from WebSocket server!");
        set({ client: null });
      },

      onStompError: (frame) => {
        console.error("Broker reported error:", frame.headers["message"]);
        console.error("Additional details:", frame.body);
      },
      reconnectDelay: 5000,
    });
    client.activate();
  },
  disconnect: () => {
    get().currentSubscription?.unsubscribe();
    get().client?.deactivate();
    set({ client: null, currentSubscription: null, currentRoomId: null });
  },

  // 일반 통로 구독
  subscribePublic: () => {
    const { client } = get();
    if (client) {
      client.subscribe(`/sub/chat/public`, (message: any) => {
        const messageData = JSON.parse(message.body);
        console.log("Received public message:", messageData);
      });
    }
  },

  // 채팅방 구독
  subscribeToRoom: (roomId: string) => {
    const { client, currentSubscription, currentRoomId } = get();
    const { addMessage } = useMessageStore.getState();
    if (roomId === currentRoomId) {
      return; // 이미 구독 중인 방이면 아무 것도 하지 않음
    }
    currentSubscription?.unsubscribe();
    const newSubscription = client?.subscribe(
      `/sub/chat/${roomId}`,
      (message) => {
        const messageData: MessageDataProps = JSON.parse(message.body);
        console.log("recive chat sub ------> ", messageData);
        if (messageData.type === "CHAT") {
          addMessage(messageData);
        }
      }
    );
    set({
      currentRoomId: roomId,
      currentSubscription: newSubscription,
    });
  },

  // 채팅방 구독 해지
  unsubscribeFromRoom: () => {
    const { currentSubscription } = get();
    if (currentSubscription) {
      currentSubscription.unsubscribe();
      set({
        currentSubscription: null,
        currentRoomId: null,
      });
    }
  },

  // 메세지 전송
  sendMessage: (data) => {
    const { client } = get();
    if (client?.connected) {
      client.publish({
        destination: `/pub/chat/sendMessage`,
        body: JSON.stringify(data),
      });
    }
  },

  //   // 채팅방 생성
  createChatRoom: (roomData: RoomDataProps) => {
    const { client } = get();
    const queryClient = new QueryClient();

    const { closeModal } = useModalStore.getState();
    if (client && client.connected) {
      client.publish({
        destination: "/pub/chat/createRoom/group",
        body: JSON.stringify(roomData),
      });
      closeModal();
      queryClient.refetchQueries({ queryKey: ["room"] });
    } else {
      console.log("WebSocket client is not connected.");
    }
  },
  // 채팅방 나가기
  leaveChatRoom: (roomId: string) => {},
}));
