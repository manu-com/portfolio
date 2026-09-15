import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3 | 4;
  as?: "div" | "section" | "span" | "li";
};

export function Reveal({ children, className = "", as = "div" }: RevealProps) {
  const Tag = as as "div";
  return <Tag className={className}>{children}</Tag>;
}