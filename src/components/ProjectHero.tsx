"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { Project } from "@/types/project";
import { DraftMark } from "./DraftMark";

export function ProjectHero({ project }: { project: Project }) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Pequeno detalhe GSAP: o título "revela-se" com uma máscara de clip-path,
    // como uma prancha sendo destampada — usado apenas aqui, com moderação.
    if (!titleRef.current) return;
    gsap.fromTo(
      titleRef.current,
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", duration: 1.3, delay: 0.3, ease: "power4.out" }
    );
  }, []);

  return (
    <section className="relative h-[92svh] w-full overflow-hidden bg-ink">
      <Image
        src={project.cover.src}
        alt={project.cover.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-85"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-ink/40" />

      <div className="relative z-10 flex h-full flex-col justify-between px-5 py-8 sm:px-8 sm:py-10 lg:px-16 lg:py-14">
        <div className="flex items-center justify-between">
          <DraftMark label={project.categoryLabel} className="!text-paper/70" />
          <DraftMark label={`${project.year} — ${project.location}`} className="!text-paper/70 hidden sm:inline-flex" />
        </div>

        <div>
          <h1
            ref={titleRef}
            className="font-display text-display-lg font-light text-paper text-balance"
          >
            {project.title}
          </h1>
          <p className="mt-4 max-w-xl text-body-lg text-paper/85">{project.subtitle}</p>
        </div>
      </div>
    </section>
  );
}
