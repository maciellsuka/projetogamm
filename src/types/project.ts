export type ProjectImage = {
  src: string;
  alt: string;
  caption?: string;
  orientation?: "landscape" | "portrait" | "square";
};

export type TeamMember = {
  name: string;
  role: string;
};

export type ProjectCategory =
  | "residencial"
  | "patrimonio-historico"
  | "saude-social"
  | "pesquisa-bim";

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  categoryLabel: string;
  year: string;
  location: string;
  area?: string;
  status: string; // e.g. "Construído", "Projeto executivo", "Concurso"
  order: number; // manual ordering for the homepage/feed
  cover: ProjectImage;
  description: string; // short, used in cards / meta
  intro: string; // opening editorial paragraph on the project page
  concept: string;
  approach?: string; // process / method paragraph (listening, technique, BIM, etc.)
  gallery: ProjectImage[];
  diagrams: ProjectImage[];
  drawings: ProjectImage[];
  details?: {
    title: string;
    text: string;
  }[];
  software: string[];
  team: TeamMember[];
  conclusion: string;
  nextProjectSlug?: string;
};
