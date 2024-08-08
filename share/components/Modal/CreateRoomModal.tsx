"use client";
import UserCheckBoxList from "@/features/chat/components/user-checkBox-list";
import { useQueryGetChatUserList } from "@/features/chat/hooks/useQueryGetChatUserList";
import { UserConfig } from "@/features/mypage/model/myConfig";
import useCheckChatRoomPersonStore, {
  roomTypeProp,
} from "@/share/store/useCreateChatRoomModalStore";
import { Badge } from "@/share/ui/badge";
import { Button } from "@/share/ui/button";
import { Input } from "@/share/ui/input";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import { useEffect } from "react";

export const CreateRoomModalTitle = ({ name }: { name: string }) => {
  const chatName = useCheckChatRoomPersonStore((state) => state.chatName);
  const handleChangeName = useCheckChatRoomPersonStore(
    (state) => state.handleChangeName
  );

  return (
    <>
      <DialogTitle className="mt-5 text-lg text-center">{name}</DialogTitle>
      <Label htmlFor="roomTitle">
        방 제목
        <Input
          aria-label="roomTitle"
          value={chatName}
          onChange={(e) => {
            handleChangeName(e.target.value);
          }}
        />
      </Label>
    </>
  );
};

export const CreateRoomModalContent = () => {
  const { data, isLoading } = useQueryGetChatUserList();

  const checkList = useCheckChatRoomPersonStore((state) => state.checkList);
  const toggleCheckbox = useCheckChatRoomPersonStore(
    (state) => state.toggleCheckbox
  );

  const renderCheckedItems = () => {
    return Array.from(checkList.values())
      .filter(({ isChecked }) => isChecked)
      .map(({ name }, index) => (
        <Badge className="mr-1 whitespace-nowrap" key={index}>
          {name}
        </Badge>
      ));
  };

  return (
    <>
      <Label htmlFor="ceateChat">초대할 인원</Label>
      <div className="w-[400px] mb-5 overflow-x-auto">
        <hr className="mb-1" />
        <ul className="flex">
          {checkList.size === 0 ? (
            <p className="text-sm text-muted-foreground">
              초대 할 인원이 존재하지 않습니다.
            </p>
          ) : (
            renderCheckedItems()
          )}
        </ul>
      </div>
      <div className="w-full">
        <p>참여가능한 인원</p>
        <hr />
        {isLoading ? (
          "로딩중"
        ) : (
          <ul className="w-full h-[300px] overflow-auto">
            {data?.map((user: UserConfig) => {
              return (
                <UserCheckBoxList
                  key={user.id}
                  user={user}
                  checked={!!checkList.get(user.loginId)?.isChecked}
                  onCheckedChange={(isChecked) =>
                    toggleCheckbox(user, isChecked)
                  }
                />
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};
//  onClick={handleCreateRoom}
export const CreateRoomModalFooter = ({
  roomType,
}: {
  roomType: roomTypeProp;
}) => {
  const getRoomType = useCheckChatRoomPersonStore((state) => state.getRoomType);
  const handleCreateRoom = useCheckChatRoomPersonStore(
    (state) => state.handleCreateRoom
  );

  useEffect(() => {
    if (roomType) {
      getRoomType(roomType);
    }
  }, [roomType]);

  return (
    <Button
      className="mr-5"
      onClick={() => {
        handleCreateRoom();
      }}
    >
      채팅방 생성
    </Button>
  );
};
