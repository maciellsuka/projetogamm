import { Reveal } from "./Reveal";

export function Quote({ text, attribution }: { text: string; attribution?: string }) {
  return (
    <Reveal className="mx-auto max-w-prose py-8 sm:py-12">
      <blockquote className="font-display font-light italic text-display-md text-ink text-balance">
        “{text}”
      </blockquote>
      {attribution && (
        <p className="mt-6 text-caption font-mono uppercase tracking-wide text-stone">
          — {attribution}
        </p>
      )}
    </Reveal>
  );
}
