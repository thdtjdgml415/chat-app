// 채팅방 리스트
export interface ChatRoomProps {
  resultCode: string;
  message: string;
  data: Room[];
}

export interface Room {
  roomId: string;
  title: string;
  roomType: string;
  loginId: string;
  lastMessage: string;
  unreadMsgNumber: number;
  // currentRoomId: any;
  // setRoomId: any;
}

// 채팅방 유저 리스트
export interface ChatUserListProps {
  data: ChatUser[];
}

export interface ChatUser {
  id: number;
  loginId: string;
  name: string;
  birthDate: string;
  gender: string;
  email: string;
  role: string;
  companyCode?: string;
  state: string;
  profile: string;
  profileImage: string;
  isConnected: boolean;
}
// zustand store
export interface MessageDataProps {
  id: number;
  content: string;
  sender: string;
  roomId: string;
  type: string;
  createdDate: string;
}
