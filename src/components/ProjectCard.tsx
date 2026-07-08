"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/types/project";
import { Reveal } from "./Reveal";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal delay={index * 0.05}>
      <Link href={`/projetos/${project.slug}`} className="group block">
        <div className="relative aspect-[4/5] overflow-hidden bg-line">
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute left-4 top-4">
            <span className="draft-mark !text-paper bg-ink/60 px-2 py-1 backdrop-blur-sm">
              {project.year}
            </span>
          </div>
        </div>

        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-xl font-light text-ink group-hover:text-clay transition-colors duration-300">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-stone">{project.categoryLabel} — {project.location}</p>
          </div>
          <span
            aria-hidden
            className="mt-2 inline-block shrink-0 text-ink/60 transition-transform duration-300 ease-editorial group-hover:translate-x-1 group-hover:text-clay"
          >
            →
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
