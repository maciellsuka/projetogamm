import Link from "next/link";
import { clsx } from "clsx";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

export function Button({ href, children, variant = "primary", className }: ButtonProps) {
  const isPrimary = variant === "primary";
  return (
    <Link
      href={href}
      className={clsx(
        "group inline-flex items-center gap-3 font-body text-sm tracking-wide transition-colors duration-300 ease-editorial",
        isPrimary
          ? "border border-ink px-7 py-3.5 text-ink hover:bg-ink hover:text-paper"
          : "text-ink/80 hover:text-ink",
        className
      )}
    >
      <span>{children}</span>
      <span
        aria-hidden
        className="inline-block transition-transform duration-300 ease-editorial group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
