"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { DraftMark } from "./DraftMark";

export function Hero({
  image,
  name,
  role,
  headline,
}: {
  image: string;
  name: string;
  role: string;
  headline: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] w-full overflow-hidden bg-ink">
      <motion.div style={{ y }} className="absolute inset-0">
        <Image
          src={image}
          alt="Composição arquitetônica em destaque"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-ink/30" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-10 flex h-full flex-col justify-between px-5 py-8 sm:px-8 sm:py-10 lg:px-16 lg:py-14">
        <div className="flex items-center justify-between">
          <DraftMark label={role} className="!text-paper/70" />
          <DraftMark label="Portfólio 2026" className="!text-paper/70 hidden sm:inline-flex" />
        </div>

        <div className="max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="font-display text-display-xl font-light text-paper text-balance"
          >
            {name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            className="mt-6 max-w-xl text-body-lg text-paper/85 text-balance"
          >
            {headline}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="flex items-center gap-3 text-paper/70"
        >
          <span className="draft-mark !text-paper/70">Role para explorar</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          >
            ↓
          </motion.span>
        </motion.div>
      </motion.div>
    </section>
  );
}
