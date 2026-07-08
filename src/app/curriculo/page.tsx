import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/Button";
import { DraftMark } from "@/components/DraftMark";
import { getSiteContent } from "@/lib/site";

export const metadata: Metadata = {
  title: "Currículo",
  description: "Formação, experiência profissional e competências técnicas.",
};

export default function ResumePage() {
  const { resume } = getSiteContent();

  return (
    <div className="pt-40 pb-30">
      <Container wide>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between mb-20">
          <SectionTitle
            eyebrow={resume.eyebrow}
            title="Formação & Experiência"
            className="max-w-xl"
          />
          <Reveal>
            <Button href={resume.downloadHref}>Baixar currículo em PDF</Button>
          </Reveal>
        </div>

        <Reveal className="mb-20 max-w-prose">
          <p className="text-body-lg text-ink/80">{resume.summary}</p>
        </Reveal>

        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
          <div>
            <DraftMark
              label="Experiência profissional"
              className="mb-8 block"
            />
            <ol className="space-y-10">
              {resume.experience.map((item) => (
                <Reveal key={item.title + item.period}>
                  <li>
                    <p className="draft-mark mb-1">{item.period}</p>
                    <h3 className="font-display text-xl font-light text-ink">
                      {item.title}
                    </h3>
                    <p className="text-stone mt-0.5">{item.place}</p>
                    <p className="mt-3 text-ink/70">{item.detail}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          <div>
            <DraftMark label="Experiência acadêmica" className="mb-8 block" />
            <ol className="space-y-10">
              {resume.academic.map((item) => (
                <Reveal key={item.title + item.period}>
                  <li>
                    <p className="draft-mark mb-1">{item.period}</p>
                    <h3 className="font-display text-xl font-light text-ink">
                      {item.title}
                    </h3>
                    <p className="text-stone mt-0.5">{item.place}</p>
                    <p className="mt-3 text-ink/70">{item.detail}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          <div>
            <DraftMark label="Trabalho Voluntário" className="mb-8 block" />
            <ol className="space-y-10">
              {resume.volunteering.map((item) => (
                <Reveal key={item.title + item.period}>
                  <li>
                    <p className="draft-mark mb-1">{item.period}</p>
                    <h3 className="font-display text-xl font-light text-ink">
                      {item.title}
                    </h3>
                    <p className="text-stone mt-0.5">{item.place}</p>
                    <p className="mt-3 text-ink/70">{item.detail}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>

          <div>
            <DraftMark label="Formação acadêmica" className="mb-8 block" />
            <ol className="space-y-10">
              {resume.education.map((item) => (
                <Reveal key={item.title}>
                  <li>
                    <p className="draft-mark mb-1">{item.period}</p>
                    <h3 className="font-display text-xl font-light text-ink">
                      {item.title}
                    </h3>
                    <p className="text-stone mt-0.5">{item.place}</p>
                    <p className="mt-3 text-ink/70">{item.detail}</p>
                  </li>
                </Reveal>
              ))}
            </ol>

            <div className="mt-16">
              <DraftMark label="Competências técnicas" className="mb-6 block" />
              <ul className="flex flex-wrap gap-2">
                {resume.skills.map((skill) => (
                  <li
                    key={skill}
                    className="border border-line px-3 py-1.5 text-sm text-ink/80"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
