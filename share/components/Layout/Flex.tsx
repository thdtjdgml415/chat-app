import React, { CSSProperties } from "react";
import { cn } from "../../lib/utils";
interface FlexProps extends React.HTMLAttributes<HTMLElement> {
  flex?: "flex";
  direction?: "flex-col" | "flex-row";
  justify?: CSSProperties["justifyContent"];
  alignItems?: CSSProperties["alignItems"];
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

function Flex({
  flex = "flex",
  direction,
  justify,
  alignItems,
  children,
  className,
  as = "div",
  ...props
}: FlexProps) {
  const Element: React.ElementType = as || "div";

  return (
    <Element
      className={cn(
        `${flex}
         ${direction ? direction : ""}
         ${justify ? justify : ""}
         ${alignItems ? alignItems : ""}`,
        className
      )}
      {...props}
    >
      {children}
    </Element>
  );
}
export default Flex;
