import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ProjectHero } from "@/components/ProjectHero";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { DraftMark } from "@/components/DraftMark";
import { ImageGrid } from "@/components/ImageGrid";
import { Gallery } from "@/components/Gallery";
import { Quote } from "@/components/Quote";
import {
  getAllProjectSlugs,
  getAdjacentProject,
  getProjectBySlug,
} from "@/lib/projects";

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [{ url: project.cover.src, width: 1920, height: 1200, alt: project.cover.alt }],
      type: "article",
    },
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const next = getAdjacentProject(project.slug);

  const meta: { label: string; value: string }[] = [
    { label: "Ano", value: project.year },
    { label: "Local", value: project.location },
    { label: "Status", value: project.status },
  ];
  if (project.area) meta.push({ label: "Área", value: project.area });

  return (
    <article>
      <ProjectHero project={project} />

      {/* Ficha técnica + introdução */}
      <section className="py-24 sm:py-30">
        <Container wide>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
            <Reveal className="lg:col-span-4">
              <dl className="grid grid-cols-2 gap-y-6 gap-x-4 lg:grid-cols-1">
                {meta.map((item) => (
                  <div key={item.label}>
                    <dt className="draft-mark">{item.label}</dt>
                    <dd className="mt-1 text-ink">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
              <p className="font-display text-display-md font-light text-ink text-balance">
                {project.intro}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Conceito */}
      <section className="pb-24 sm:pb-30">
        <Container wide>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
            <Reveal className="lg:col-span-3">
              <DraftMark label="Conceito" />
            </Reveal>
            <Reveal delay={0.05} className="lg:col-span-8">
              <p className="text-body-lg text-ink/80 max-w-prose">{project.concept}</p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Diagramas */}
      {project.diagrams.length > 0 && (
        <section className="pb-24 sm:pb-30">
          <Container wide>
            <DraftMark label="Diagramas" className="mb-8 block" />
            <ImageGrid images={project.diagrams} />
          </Container>
        </section>
      )}

      {/* Abordagem / processo */}
      {project.approach && (
        <section className="pb-8 sm:pb-12">
          <Container className="max-w-3xl">
            <Quote text={project.approach} attribution="Processo de projeto" />
          </Container>
        </section>
      )}

      {/* Plantas / desenhos técnicos */}
      {project.drawings.length > 0 && (
        <section className="py-24 sm:py-30">
          <Container wide>
            <DraftMark label="Plantas & desenhos técnicos" className="mb-8 block" />
            <ImageGrid images={project.drawings} />
          </Container>
        </section>
      )}

      {/* Galeria — renders / fotos, ritmo editorial em tela cheia */}
      <section className="py-24 sm:py-30 bg-ink">
        <Container wide>
          <DraftMark label="Registro" className="mb-12 block !text-paper/60" />
          <Gallery images={project.gallery} />
        </Container>
      </section>

      {/* Detalhes construtivos */}
      {project.details && project.details.length > 0 && (
        <section className="py-24 sm:py-30">
          <Container wide>
            <DraftMark label="Detalhes construtivos" className="mb-10 block" />
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
              {project.details.map((d) => (
                <Reveal key={d.title}>
                  <h3 className="font-display text-xl font-light text-ink">{d.title}</h3>
                  <p className="mt-3 text-ink/70 max-w-prose">{d.text}</p>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Ficha de equipe e software */}
      <section className="pb-24 sm:pb-30">
        <Container wide>
          <div className="grid grid-cols-1 gap-14 sm:grid-cols-2">
            <Reveal>
              <DraftMark label="Equipe" className="mb-5 block" />
              <ul className="space-y-3">
                {project.team.map((member) => (
                  <li key={member.name} className="flex justify-between border-b border-line pb-3">
                    <span className="text-ink">{member.name}</span>
                    <span className="text-stone">{member.role}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.05}>
              <DraftMark label="Softwares utilizados" className="mb-5 block" />
              <ul className="flex flex-wrap gap-2">
                {project.software.map((s) => (
                  <li key={s} className="border border-line px-3 py-1.5 text-sm text-ink/80">
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Conclusão */}
      <section className="pb-30 sm:pb-34">
        <Container className="max-w-3xl">
          <DraftMark label="Considerações finais" className="mb-6 block" />
          <Reveal>
            <p className="text-body-lg text-ink/80">{project.conclusion}</p>
          </Reveal>
        </Container>
      </section>

      {/* Navegação para o próximo projeto */}
      {next && (
        <section className="border-t border-line">
          <Link href={`/projetos/${next.slug}`} className="group block relative h-[60svh] overflow-hidden bg-ink">
            <Image
              src={next.cover.src}
              alt={next.cover.alt}
              fill
              sizes="100vw"
              className="object-cover opacity-70 transition-transform duration-700 ease-editorial group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-ink/40" />
            <div className="relative z-10 flex h-full flex-col items-start justify-center px-5 sm:px-8 lg:px-16">
              <DraftMark label="Próximo projeto" className="mb-4 block !text-paper/70" />
              <h3 className="font-display text-display-md font-light text-paper text-balance">
                {next.title}
              </h3>
              <span className="mt-4 inline-flex items-center gap-2 text-paper/80 group-hover:text-paper transition-colors">
                Ver projeto
                <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden>→</span>
              </span>
            </div>
          </Link>
        </section>
      )}
    </article>
  );
}
