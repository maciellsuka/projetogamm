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
  client?: string; // opcional — aparece na Ficha Técnica quando houver
  status: string; // e.g. "Construído", "Projeto executivo", "Concurso"
  order: number; // manual ordering for the homepage/feed
  cover: ProjectImage;
  description: string; // short, used in cards / meta
  /**
   * Memorial descritivo — o texto principal da página do projeto.
   * Um array de parágrafos corridos (não fragmentados em mini-seções),
   * no espírito de um memorial de arquitetura: contexto, programa, números,
   * conceito e processo tratados como uma única narrativa contínua.
   * Suporta ênfase inline com **negrito** (nomes, números, termos-chave).
   */
  memorial: string[];
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
