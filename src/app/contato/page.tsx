import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { DraftMark } from "@/components/DraftMark";
import { getSiteContent } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato",
  description: "Entre em contato para projetos residenciais, consultorias em patrimônio histórico e parcerias institucionais.",
};

export default function ContactPage() {
  const { contact, identity } = getSiteContent();

  return (
    <div className="pt-40 pb-30 min-h-[70svh]">
      <Container wide>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <DraftMark label={contact.eyebrow} className="mb-6 block" />
            <Reveal>
              <h1 className="font-display text-display-lg font-light text-ink text-balance">
                {contact.headline}
              </h1>
            </Reveal>
            <Reveal delay={0.05} className="mt-8 max-w-prose">
              <p className="text-body-lg text-ink/75">{contact.text}</p>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <div className="border-t border-line pt-8 space-y-6">
              <div>
                <p className="draft-mark mb-1">E-mail</p>
                <a href={`mailto:${identity.email}`} className="text-lg text-ink hover:text-clay transition-colors">
                  {identity.email}
                </a>
              </div>
              <div>
                <p className="draft-mark mb-1">Telefone</p>
                <p className="text-lg text-ink">{identity.phone}</p>
              </div>
              <div>
                <p className="draft-mark mb-1">Instagram</p>
                <p className="text-lg text-ink">{identity.instagram}</p>
              </div>
              <div>
                <p className="draft-mark mb-1">LinkedIn</p>
                <p className="text-lg text-ink">{identity.linkedin}</p>
              </div>
              <div>
                <p className="draft-mark mb-1">Localização</p>
                <p className="text-lg text-ink">{identity.location}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </div>
  );
}
