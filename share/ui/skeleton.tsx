import { cn } from "@/share/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-[#00000044]", className)}
      {...props}
    />
  );
}

export { Skeleton };
