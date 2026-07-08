"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import type { ProjectImage } from "@/types/project";

export function Lightbox({
  images,
  activeIndex,
  onClose,
  onNavigate,
}: {
  images: ProjectImage[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const isOpen = activeIndex !== null;
  const current = isOpen ? images[activeIndex] : null;

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && activeIndex !== null) {
        onNavigate((activeIndex + 1) % images.length);
      }
      if (e.key === "ArrowLeft" && activeIndex !== null) {
        onNavigate((activeIndex - 1 + images.length) % images.length);
      }
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, activeIndex, images.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 px-4 py-10"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute right-6 top-6 draft-mark !text-paper/80 hover:!text-paper"
            aria-label="Fechar visualização"
          >
            Fechar ✕
          </button>

          <motion.div
            key={current.src}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </motion.div>

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 draft-mark !text-paper/70">
            {activeIndex! + 1} / {images.length}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
