import Image from "next/image";
import { Hero } from "@/components/Hero";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/Button";
import { DraftMark } from "@/components/DraftMark";
import { getFeaturedProjects } from "@/lib/projects";
import { getSiteContent } from "@/lib/site";

export default function HomePage() {
  const { identity, home, about } = getSiteContent();
  const featured = getFeaturedProjects(3);

  return (
    <>
      <Hero
        image={home.heroImage}
        name={identity.name}
        role={identity.role}
        headline={home.heroHeadline}
      />

      {/* Manifesto */}
      <section className="py-30 sm:py-34">
        <Container wide>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <SectionTitle eyebrow={home.manifestoEyebrow} title={home.manifestoTitle} />
              <div className="mt-10 space-y-5 max-w-prose">
                {home.manifestoParagraphs.map((p, i) => (
                  <Reveal key={i} delay={0.1 + i * 0.05}>
                    <p className="text-body text-ink/75">{p}</p>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={0.3} className="mt-10">
                <Button href="/sobre" variant="ghost">Conheça a trajetória</Button>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="lg:col-span-7 relative aspect-[4/3] lg:aspect-auto lg:h-full overflow-hidden bg-line">
              <Image
                src={home.manifestoImage}
                alt="Estudo de massa arquitetônica"
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
            </Reveal>
          </div>
        </Container>
      </section>

      <div className="rule" />

      {/* Projetos em destaque */}
      <section className="py-30 sm:py-34">
        <Container wide>
          <div className="flex items-end justify-between gap-6 mb-16">
            <SectionTitle eyebrow="Projetos selecionados" title="Trabalhos recentes" />
            <Reveal className="hidden sm:block">
              <Button href="/projetos" variant="ghost">Ver todos</Button>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>

          <Reveal className="mt-14 sm:hidden">
            <Button href="/projetos" variant="ghost">Ver todos os projetos</Button>
          </Reveal>
        </Container>
      </section>

      <div className="rule" />

      {/* Sobre — teaser */}
      <section className="py-30 sm:py-34">
        <Container wide>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8 items-center">
            <Reveal className="lg:col-span-4 relative aspect-[3/4] overflow-hidden bg-line order-2 lg:order-1">
              <Image
                src={about.portrait}
                alt={identity.name}
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover"
              />
            </Reveal>

            <div className="lg:col-span-7 lg:col-start-6 order-1 lg:order-2">
              <DraftMark label="Sobre" className="mb-5 block" />
              <Reveal>
                <p className="font-display text-display-md font-light text-ink text-balance">
                  {about.intro}
                </p>
              </Reveal>
              <Reveal delay={0.1} className="mt-8">
                <Button href="/sobre">Ler perfil completo</Button>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
