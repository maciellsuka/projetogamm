import { clsx } from "clsx";
import { Reveal } from "./Reveal";

export function SectionTitle({
  eyebrow,
  title,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={clsx(align === "center" && "text-center", className)}>
      {eyebrow && (
        <Reveal>
          <p className="text-eyebrow font-mono uppercase text-stone mb-5">{eyebrow}</p>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="font-display font-light text-display-md text-ink text-balance">
          {title}
        </h2>
      </Reveal>
    </div>
  );
}
