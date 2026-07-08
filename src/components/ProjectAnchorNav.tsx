"use client";

type AnchorItem = { href: string; label: string };

const ITEMS: AnchorItem[] = [
  { href: "#memorial", label: "Memorial" },
  { href: "#registro", label: "Registro" },
  { href: "#ficha-tecnica", label: "Ficha Técnica" },
];

/**
 * Nav de âncoras discreta, inspirada no padrão "Memorial / Ficha Técnica"
 * de memoriais de escritório — permite pular direto para a leitura longa
 * ou para os dados objetivos, sem depender de scroll.
 */
export function ProjectAnchorNav() {
  return (
    <div className="sticky top-20 z-30 border-b border-line bg-paper/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-editorial gap-8 px-5 py-4 sm:px-8 lg:px-16">
        {ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="draft-mark hover:text-clay transition-colors"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
