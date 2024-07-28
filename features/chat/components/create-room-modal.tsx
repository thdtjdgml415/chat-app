import useModalStore from "@/hooks/useModalStore";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/share/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

import { useQueryGetChatUserList } from "@/features/chat/hooks/useQueryGetChatUserList";
import { UserConfig } from "@/features/mypage/model/myConfig";
import { Badge } from "@/share/ui/badge";
import { Button } from "@/share/ui/button";
import { Label } from "@radix-ui/react-label";
import { useEffect, useRef, useState } from "react";
import UserCheckBoxList from "./user-checkBox-list";

import { Input } from "@/share";

import { useWebSocketStore } from "@/share/store/useWebsocketStore";
import { v4 as uuidv4 } from "uuid";
export interface RoomDataProps {
  creator: string;
  roomType: string;
  participant: string[];
  roomId: any;
  title?: string;
}

export default function CreateRoomModal({}: {}) {
  const { name, roomType, isOpen, setOpen } = useModalStore();

  const { createChatRoom } = useWebSocketStore();
  const { data, isLoading } = useQueryGetChatUserList();
  const [checkedState, setCheckedState] = useState(new Map());
  const [checkList, setCheckList] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const ref = useRef(null);

  const handleCreateRoom = () => {
    const roomUuid = uuidv4();
    if (roomType) {
      const roomData: RoomDataProps = {
        creator: "song",
        roomType,
        title: title,
        participant: checkList,
        roomId: roomUuid,
      };

      createChatRoom(roomData);

      setTimeout((open: any) => {
        if (!open) {
          document.body.style.pointerEvents = "";
        }
      }, 500);
    }
  };

  const handleClose = (shouldClose: any) => {
    if (!shouldClose) return;

    // 체크리스트에 아이템이 있는 경우에만 확인 요청
    if (checkList.length > 0) {
      if (confirm("정말로 모달을 닫으시겠습니까? 체크리스트가 초기화됩니다.")) {
        setOpen(shouldClose); // 사용자가 확인을 누르면 모달을 닫고
        setCheckedState(new Map()); // 체크 상태를 초기화합니다.
      } else {
        return; // 사용자가 취소를 누르면 모달을 닫지 않습니다.
      }
    } else {
      setOpen(shouldClose); // 체크리스트가 비어있으면 바로 모달을 닫습니다.
    }
  };

  const handleCheckboxChange = (
    user: UserConfig,
    isChecked: boolean | string
  ) => {
    setCheckedState(
      new Map(
        checkedState.set(user.loginId, {
          isChecked: isChecked,
          name: user.name,
        })
      )
    );
  };
  // 체크리스트 state에 저장
  useEffect(() => {
    const newCheckedList: string[] = [];
    checkedState.forEach((value, key) => {
      if (value.isChecked) {
        newCheckedList.push(key);
      }
    });
    setCheckList(newCheckedList);
  }, [checkedState]);

  const renderCheckedItems = () => {
    return Array.from(checkedState.entries())
      .filter(([_, value]) => value.isChecked === true)
      .map(([loginId, value]) => (
        <Badge className="mr-1 whitespace-nowrap" key={loginId}>
          {value.name}
        </Badge>
      ));
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open: any) => {
        handleClose(isOpen);
        setTimeout((open: any) => {
          if (!open) {
            document.body.style.pointerEvents = "";
          }
        }, 500);
      }}
    >
      <DialogContent className="w-[500px] h-[600px] rounded-md">
        <div className="box-border px-5">
          <DialogHeader>
            <DialogTitle className="mt-5 text-lg text-center">
              {name}
            </DialogTitle>
            <Label htmlFor="roomTitle">
              방 제목
              <Input
                aria-label="roomTitle"
                value={title}
                ref={ref}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </Label>
          </DialogHeader>
          <Label htmlFor="ceateChat">초대할 인원</Label>
          <div className="w-[460px] mb-5 overflow-x-auto">
            <hr className="mb-1" />
            <ul className="flex">
              {checkList.length === 0 ? (
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
            {isLoading === true ? (
              "로딩중"
            ) : (
              <ul className="w-full h-[300px] overflow-auto">
                {data?.map((user: UserConfig) => {
                  return (
                    <UserCheckBoxList
                      key={user.id}
                      user={user}
                      checked={!!checkedState.get(user.loginId)?.isChecked}
                      onCheckedChange={(isChecked) =>
                        handleCheckboxChange(user, isChecked)
                      }
                    />
                  );
                })}
              </ul>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button className="mr-5" onClick={handleCreateRoom}>
            채팅방 생성
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
