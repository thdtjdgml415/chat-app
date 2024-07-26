import { cva, type VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

const textVarients = cva("", {
  variants: {
    size: {
      t1: "text-[30px] leading-[1.45]",
      t2: "text-[24px] leading-[1.5]",
      t3: "text-[20px] leading-[1.4]",
      t4: "text-[20px] leading-[1.45]",
      t5: "text-[17px] leading-4",
      t6: "text-[15px] leading-3",
      t7: "text-xs",
    },
    weight: {
      xs: "font-extralight",
      s: "font-light",
      m: "font-medium",
      l: "font-semibold",
      xl: "font-bold",
    },
    color: {
      black: "text-black",
      grey: "text-gray-400",
    },
  },

  defaultVariants: {
    size: "t5",
    weight: "m",
    color: "black",
  },
});

export interface TextProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof textVarients> {
  children: React.ReactNode;
}

function Text({
  children,
  size,
  weight,
  color,
  className,
  ...props
}: TextProps) {
  return (
    <span
      className={cn(textVarients({ size, weight, color, className }))}
      {...props}
    >
      {children}
    </span>
  );
}

export default Text;
