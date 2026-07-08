import { Fragment } from "react";

/**
 * Suporte mínimo a ênfase inline dentro dos textos vindos do JSON
 * (`**termo em destaque**` → <strong>). Evita ter que escrever HTML/JSX
 * dentro do conteúdo — o JSON continua sendo texto puro e editável por
 * qualquer pessoa, sem conhecimento técnico.
 */
export function RichText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return (
    <p className={className}>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-medium text-ink">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </p>
  );
}
