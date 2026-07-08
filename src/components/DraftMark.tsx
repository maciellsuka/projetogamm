import { clsx } from "clsx";

/**
 * Elemento-assinatura do design system: referencia a anotação de pranchas
 * técnicas (coordenadas, escala, norte) sem se tornar decoração gratuita.
 * Usado com moderação — cabeçalhos de seção e rodapés de página de projeto.
 */
export function DraftMark({ label, className }: { label: string; className?: string }) {
  return (
    <span className={clsx("draft-mark inline-flex items-center gap-2 uppercase", className)}>
      <span aria-hidden className="inline-block h-[5px] w-[5px] rounded-full bg-clay" />
      {label}
    </span>
  );
}
