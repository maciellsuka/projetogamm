import Image from "next/image";
import { clsx } from "clsx";
import type { ProjectImage } from "@/types/project";
import { Reveal } from "./Reveal";

/**
 * Grid editorial simples: uma imagem grande + duas menores, alternando
 * conforme a orientação informada no JSON. Pensado para ritmo de revista,
 * não para uma galeria uniforme de thumbnails.
 */
export function ImageGrid({ images }: { images: ProjectImage[] }) {
  if (images.length === 0) return null;

  const [first, ...rest] = images;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Reveal className={clsx("relative overflow-hidden bg-line", "sm:col-span-2 aspect-[16/9]")}>
        <Image
          src={first.src}
          alt={first.alt}
          fill
          sizes="(min-width: 1024px) 1200px, 100vw"
          className="object-cover"
        />
      </Reveal>

      {rest.map((img, i) => (
        <Reveal
          key={img.src}
          delay={i * 0.05}
          className={clsx(
            "relative overflow-hidden bg-line",
            img.orientation === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]"
          )}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(min-width: 1024px) 600px, 100vw"
            className="object-cover"
          />
          {img.caption && (
            <span className="absolute bottom-3 left-3 draft-mark !text-paper bg-ink/60 px-2 py-1 backdrop-blur-sm">
              {img.caption}
            </span>
          )}
        </Reveal>
      ))}
    </div>
  );
}
