import Link from "next/link";
import { getSiteContent } from "@/lib/site";
import { Container } from "./Container";
import { DraftMark } from "./DraftMark";

export function Footer() {
  const { identity } = getSiteContent();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line pt-16 pb-10">
      <Container wide>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="font-display text-2xl font-light text-ink">
              {identity.name}
            </p>
            <p className="mt-2 text-stone">
              {identity.role} — {identity.location}
            </p>
            <p className="mt-6 max-w-sm text-ink/70">{identity.tagline}</p>
          </div>

          <div>
            <DraftMark label="Navegação" className="mb-4 block" />
            <ul className="space-y-2">
              <li>
                <Link
                  href="/projetos"
                  className="hover:text-clay transition-colors"
                >
                  Projetos
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre"
                  className="hover:text-clay transition-colors"
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  href="/curriculo"
                  className="hover:text-clay transition-colors"
                >
                  Currículo
                </Link>
              </li>
              <li>
                <Link
                  href="/contato"
                  className="hover:text-clay transition-colors"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <DraftMark label="Contato" className="mb-4 block" />
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${identity.email}`}
                  className="hover:text-clay transition-colors"
                >
                  {identity.email}
                </a>
              </li>
              <li>{identity.phone}</li>
              <li>{identity.instagram}</li>
              <li>{identity.linkedin}</li>
            </ul>
          </div>
        </div>

        <div className="rule mt-14 mb-6" />

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="draft-mark">
            © {year} {identity.name} — Todos os direitos reservados
          </p>
          <p className="draft-mark">23°30'S · Sorocaba, SP</p>
        </div>
      </Container>
    </footer>
  );
}
