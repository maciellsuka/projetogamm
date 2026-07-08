"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProjectImage } from "@/types/project";
import { Reveal } from "./Reveal";
import { Lightbox } from "./Lightbox";

export function Gallery({ images }: { images: ProjectImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <div className="flex flex-col gap-24 sm:gap-32">
        {images.map((img, i) => (
          <Reveal key={img.src} y={28}>
            <button
              onClick={() => setActiveIndex(i)}
              className={`relative block w-full overflow-hidden bg-line ${
                img.orientation === "portrait" ? "mx-auto max-w-xl aspect-[3/4]" : "aspect-[16/9]"
              }`}
              aria-label={`Ampliar imagem: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 1200px, 100vw"
                className="object-cover transition-transform duration-700 ease-editorial hover:scale-[1.02]"
              />
            </button>
            {img.caption && (
              <p className="mt-3 draft-mark">{img.caption}</p>
            )}
          </Reveal>
        ))}
      </div>

      <Lightbox
        images={images}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </>
  );
}
