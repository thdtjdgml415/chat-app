import { cn } from "../../lib/utils";
import Flex from "../Layout/Flex";
import Text from "../Text/Text";
import ContextMenuList from "./ContextMenuList";
import HoverCardContents from "./HoverCardContents";
import IsConnectFc from "./IsConnect";

interface RowListProps {
  left?: React.ReactNode;
  content: React.ReactNode;
  link?: string;
  as?: React.ElementType;
  className?: string;
}

function RowList({ left, content, as, className }: RowListProps) {
  return (
    <Flex alignItems="items-center" className={className} as={as}>
      {left ?? <Flex>{left}</Flex>}
      <Text className={cn({ size: "t1" }, "w-full")}>{content}</Text>
    </Flex>
  );
}

RowList.context = ContextMenuList;
RowList.isConnect = IsConnectFc;
RowList.hover = HoverCardContents;

export default RowList;
