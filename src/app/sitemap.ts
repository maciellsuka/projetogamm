import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";

const SITE_URL = "https://gabrielmarinho.arq.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/projetos", "/sobre", "/curriculo", "/contato"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const projectRoutes = getAllProjects().map((project) => ({
    url: `${SITE_URL}/projetos/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
