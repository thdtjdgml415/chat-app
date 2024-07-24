import { TbCircleArrowRightFilled } from "react-icons/tb";
import { Button, buttonVariants } from "@/share/ui/button";
import { cn } from "@/share/lib/utils";

interface ToggleProps {
  toggleFn: () => void;
  state: boolean;
  label: string;
}

export default function ToggleListBtn({ toggleFn, state, label }: ToggleProps) {
  return (
    <div className="flex items-center">
      <Button
        className={cn(
          "flex justify-center items-center mr-3 rounded-md bg-inherit hover:bg-black/10"
        )}
        size={"icon"}
        onClick={toggleFn}
      >
        <TbCircleArrowRightFilled
          className={`text-black cursor-pointer ${
            state ? "transform rotate-90 " : ""
          }`}
        />
      </Button>
      <label className="text-md text-black font-bold">{label}</label>
    </div>
  );
}
