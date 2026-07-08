import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ProjectHero } from "@/components/ProjectHero";
import { ProjectAnchorNav } from "@/components/ProjectAnchorNav";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { DraftMark } from "@/components/DraftMark";
import { ImageGrid } from "@/components/ImageGrid";
import { Gallery } from "@/components/Gallery";
import { Memorial } from "@/components/Memorial";
import { FichaTecnica } from "@/components/FichaTecnica";
import {
  getAllProjectSlugs,
  getAdjacentProject,
  getProjectBySlug,
} from "@/lib/projects";

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [
        {
          url: project.cover.src,
          width: 1920,
          height: 1200,
          alt: project.cover.alt,
        },
      ],
      type: "article",
    },
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const next = getAdjacentProject(project.slug);

  return (
    <article>
      <ProjectHero project={project} />
      <ProjectAnchorNav />

      {/* Memorial descritivo — texto principal, corrido, mais extenso.
          É a mudança pedida: mais conteúdo textual lido como uma narrativa
          única, no espírito de um memorial de escritório, em vez de
          fragmentado em mini-seções de "conceito"/"abordagem". */}
      <section className="pt-20 pb-24 sm:pt-24 sm:pb-30">
        <Container wide>
          <Memorial paragraphs={project.memorial} />
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

      {/* Plantas / desenhos técnicos */}
      {project.drawings.length > 0 && (
        <section className="pb-24 sm:pb-30">
          <Container wide>
            <DraftMark
              label="Plantas & desenhos técnicos"
              className="mb-8 block"
            />
            <ImageGrid images={project.drawings} />
          </Container>
        </section>
      )}

      {/* Galeria — renders / fotos, ritmo editorial em tela cheia */}
      <section id="registro" className="scroll-mt-36 py-24 sm:py-30 bg-ink">
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
                  <h3 className="font-display text-xl font-light text-ink">
                    {d.title}
                  </h3>
                  <p className="mt-3 text-ink/70 max-w-prose">{d.text}</p>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Ficha Técnica — consolidada, formato rótulo/valor, para leitura rápida */}
      <section className="pb-24 sm:pb-30">
        <Container wide>
          <FichaTecnica project={project} />
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
          <Link
            href={`/projetos/${next.slug}`}
            className="group block relative h-[60svh] overflow-hidden bg-ink"
          >
            <Image
              src={next.cover.src}
              alt={next.cover.alt}
              fill
              sizes="100vw"
              className="object-cover opacity-70 transition-transform duration-700 ease-editorial group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-ink/40" />
            <div className="relative z-10 flex h-full flex-col items-start justify-center px-5 sm:px-8 lg:px-16">
              <DraftMark
                label="Próximo projeto"
                className="mb-4 block !text-paper/70"
              />
              <h3 className="font-display text-display-md font-light text-paper text-balance">
                {next.title}
              </h3>
              <span className="mt-4 inline-flex items-center gap-2 text-paper/80 group-hover:text-paper transition-colors">
                Ver projeto
                <span
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                >
                  →
                </span>
              </span>
            </div>
          </Link>
        </section>
      )}
    </article>
  );
}
