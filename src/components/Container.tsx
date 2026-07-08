import { clsx } from "clsx";
import type { ReactNode } from "react";

export function Container({
  children,
  className,
  wide = false,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div
      className={clsx(
        "mx-auto w-full px-5 sm:px-8 lg:px-12 xl:px-16",
        wide ? "max-w-editorial" : "max-w-[1200px]",
        className
      )}
    >
      {children}
    </div>
  );
}
