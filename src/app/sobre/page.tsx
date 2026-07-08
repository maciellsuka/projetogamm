import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";
import { getSiteContent } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Perfil, trajetória e áreas de atuação de Gabriel Augusto Moreira Marinho.",
};

export default function AboutPage() {
  const { about, identity } = getSiteContent();

  return (
    <div className="pt-40 pb-30">
      <Container wide>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-4 relative aspect-[3/4] overflow-hidden bg-line">
            <Image
              src={about.portrait}
              alt={identity.name}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover"
            />
          </Reveal>

          <div className="lg:col-span-7 lg:col-start-6">
            <SectionTitle eyebrow={about.eyebrow} title={identity.name} className="mb-8" />
            <div className="space-y-6 max-w-prose">
              {about.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.05 + i * 0.05}>
                  <p className="text-body text-ink/75">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <div className="rule my-24" />

        <div>
          <SectionTitle eyebrow="Áreas de atuação" title="Onde a prática se aprofunda" className="mb-14 max-w-xl" />
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            {about.focusAreas.map((area, i) => (
              <Reveal key={area.title} delay={i * 0.05}>
                <span className="draft-mark">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-xl font-light text-ink">{area.title}</h3>
                <p className="mt-3 text-ink/70 max-w-prose">{area.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
