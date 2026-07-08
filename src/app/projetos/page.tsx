import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { ProjectCard } from "@/components/ProjectCard";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projetos",
  description: "Projetos residenciais, de patrimônio histórico e de arquitetura social.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="pt-40 pb-30">
      <Container wide>
        <SectionTitle
          eyebrow="Portfólio"
          title="Projetos"
          className="mb-16 max-w-2xl"
        />

        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </Container>
    </div>
  );
}
