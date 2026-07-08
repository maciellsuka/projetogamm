import { Reveal } from "./Reveal";
import { DraftMark } from "./DraftMark";
import { RichText } from "./RichText";

/**
 * Texto principal da página de projeto — memorial descritivo corrido,
 * ao invés de fragmentado em "introdução / conceito / abordagem"
 * separados. Referência: memoriais de escritórios como Vigliecca &
 * Associados — um único bloco de leitura, denso e contínuo, com números
 * e nomes destacados em negrito ao longo do texto.
 */
export function Memorial({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div id="memorial" className="scroll-mt-36">
      <DraftMark label="Memorial descritivo" className="mb-8 block" />
      <div className="max-w-[68ch] space-y-6">
        {paragraphs.map((p, i) => (
          <Reveal key={i} delay={i * 0.03} y={14}>
            <RichText
              text={p}
              className="text-body-lg leading-relaxed text-ink/80"
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
