"use client";

import type { ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3 | 4;
  as?: "div" | "section" | "span" | "li";
};

export function Reveal({ children, className = "", delay = 0, as = "div" }: RevealProps) {
  const { ref, isVisible } = useInView<HTMLDivElement>();

  const delayClass = delay > 0 ? `reveal-delay-${delay}` : "";
  const Tag = as as "div";

  return (
    <Tag
      ref={ref}
      className={`reveal ${delayClass} ${isVisible ? "is-visible" : ""} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}