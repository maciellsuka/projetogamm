"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "./Container";

const LINKS = [
  { href: "/projetos", label: "Projetos" },
  { href: "/sobre", label: "Sobre" },
  { href: "/curriculo", label: "Currículo" },
  { href: "/contato", label: "Contato" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-editorial ${
        scrolled ? "bg-paper/90 backdrop-blur-sm border-b border-line" : "bg-transparent"
      }`}
    >
      <Container wide>
        <nav className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="font-display text-lg tracking-tight text-ink"
            onClick={() => setOpen(false)}
          >
            Gabriel Marinho
          </Link>

          <ul className="hidden md:flex items-center gap-10">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-ink/80 hover:text-ink transition-colors duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            className="md:hidden text-sm text-ink font-mono uppercase tracking-wide"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Abrir menu"
          >
            {open ? "Fechar" : "Menu"}
          </button>
        </nav>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-paper border-b border-line"
          >
            <Container wide className="py-6">
              <ul className="flex flex-col gap-5">
                {LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="font-display text-2xl font-light text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
