import type { Project } from "@/types/project";

// Cada projeto é um arquivo .json dentro de src/content/projects.
// Adicionar um projeto novo = criar o JSON + as imagens em /public/images/projects/<slug>.
// Nenhum componente precisa ser alterado — apenas registrar o import abaixo.
//
// Import estático dos conteúdos. Em um projeto real, isso pode ser trocado
// por fast-glob no lado do servidor caso a quantidade de projetos cresça
// muito; para o volume típico de um portfólio autoral, a lista explícita é
// mais simples de auditar e não exige build step adicional.
import casaraoAzul from "@/content/projects/casarao-azul.json";
import apartamentoJd from "@/content/projects/apartamento-jd.json";
import ubsVilaEsperanca from "@/content/projects/ubs-vila-esperanca.json";

const allProjects = [casaraoAzul, apartamentoJd, ubsVilaEsperanca] as unknown as Project[];

export function getAllProjects(): Project[] {
  return [...allProjects].sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return allProjects.map((p) => p.slug);
}

export function getAdjacentProject(currentSlug: string): Project | undefined {
  const current = getProjectBySlug(currentSlug);
  if (!current?.nextProjectSlug) return undefined;
  return getProjectBySlug(current.nextProjectSlug);
}

export function getFeaturedProjects(limit = 3): Project[] {
  return getAllProjects().slice(0, limit);
}
