"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
};

/**
 * Reveal discreto e consistente para todo o site.
 * Sem exageros: leve deslocamento vertical + fade, mesma curva de easing
 * em qualquer lugar em que for usado — a repetição é o que dá a sensação
 * de "sistema", não de efeito pontual.
 */
export function Reveal({ children, delay = 0, y = 18, className, once = true }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
