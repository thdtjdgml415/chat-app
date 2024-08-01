import { UserConfig } from "@/features/mypage/model/myConfig";
import { Checkbox } from "@/share/ui/checkbox";

import { Label } from "@radix-ui/react-label";

// UserCheckBoxList 컴포넌트
export default function UserCheckBoxList({
  user,
  checked,
  onCheckedChange,
}: {
  user: UserConfig;
  checked: boolean;
  onCheckedChange: (isChecked: boolean) => void;
}) {
  return (
    <li className="flex items-center justify-around py-2 hover:bg-menu">
      <Label htmlFor={`${user.loginId}`}>{user.name}</Label>
      <Checkbox
        id={`${user.loginId}`}
        checked={checked}
        onCheckedChange={(e: boolean) => onCheckedChange(e)}
      />
    </li>
  );
}
