# Gabriel Augusto Moreira Marinho — Portfólio de Arquitetura

Portfólio digital editorial construído com Next.js (App Router) + TypeScript
+ Tailwind CSS + Framer Motion + Lenis. Ver `DESIGN_SYSTEM.md` para a
documentação completa do sistema visual.

## Stack

- **Next.js 14** (App Router, SSG para páginas de projeto)
- **TypeScript**
- **Tailwind CSS** — tokens do design system em `tailwind.config.ts`
- **Framer Motion** — reveals, parallax leve, microinterações
- **Lenis** — smooth scroll
- **GSAP** — usado em um único ponto (reveal do título na página de projeto)
- **@react-pdf/renderer** — gera o PDF do portfólio a partir do mesmo
  conteúdo JSON usado pelo site

## Como rodar

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

```bash
npm run build   # build de produção
npm run start   # serve o build
npm run lint    # lint
```

Deploy recomendado: **Vercel** (zero configuração adicional — basta importar
o repositório).

## Estrutura do projeto

```
src/
  app/                     # rotas (App Router)
    page.tsx               # home
    projetos/page.tsx      # listagem de projetos
    projetos/[slug]/page.tsx  # página dinâmica de cada projeto
    sobre/page.tsx
    curriculo/page.tsx
    contato/page.tsx
    sitemap.ts             # sitemap.xml gerado a partir dos projetos
    robots.ts
    layout.tsx             # fontes, metadata, Navbar/Footer, smooth scroll
    globals.css
  components/              # todos os componentes reutilizáveis
  content/
    projects/*.json        # UM ARQUIVO POR PROJETO — ver seção abaixo
    site.json              # copy institucional (home, sobre, currículo, contato)
  lib/
    projects.ts            # leitura tipada dos JSONs de projeto
    site.ts                # leitura tipada do site.json
    fonts.ts                # next/font (Fraunces, Inter, IBM Plex Mono)
  types/
    project.ts              # modelo de dados de um projeto
  hooks/
  utils/
scripts/
  build-pdf.tsx            # gera public/documents/*.pdf a partir do MESMO conteúdo
public/
  images/                  # imagens de cada projeto, home e sobre
```

## Como adicionar um projeto novo

Nenhum componente precisa ser alterado. Basta:

1. Criar as imagens em `public/images/projects/<slug>/` (hero, galeria,
   plantas, diagramas).
2. Criar `src/content/projects/<slug>.json` seguindo o modelo abaixo
   (ver `src/types/project.ts` para o tipo completo):

```json
{
  "slug": "novo-projeto",
  "title": "",
  "subtitle": "",
  "category": "residencial",
  "categoryLabel": "Residencial",
  "year": "",
  "location": "",
  "status": "",
  "order": 4,
  "cover": { "src": "/images/projects/novo-projeto/hero.jpg", "alt": "" },
  "description": "",
  "intro": "",
  "concept": "",
  "gallery": [],
  "diagrams": [],
  "drawings": [],
  "software": [],
  "team": [],
  "conclusion": "",
  "nextProjectSlug": "outro-slug-existente"
}
```

3. Registrar o import em `src/lib/projects.ts` (uma linha de `import` +
   adicionar ao array `allProjects`). Este é o único arquivo de código
   tocado ao adicionar conteúdo — e é só para registrar o arquivo, não para
   alterar layout ou componentes.

A página `/projetos/<slug>` é gerada automaticamente por
`generateStaticParams` em `src/app/projetos/[slug]/page.tsx`, com toda a
narrativa (hero, introdução, conceito, diagramas, plantas, galeria,
detalhes construtivos, ficha técnica, equipe, softwares, conclusão e
navegação para o próximo projeto).

## Conteúdo institucional

Textos de home, sobre, currículo e contato ficam centralizados em
`src/content/site.json` — editar esse arquivo não exige tocar em nenhum
componente.

## Imagens

Os arquivos em `public/images/` neste scaffold são **placeholders
gerados** (composições abstratas na paleta do design system, no lugar de
fotografias reais), só para que o layout, o ritmo editorial e o grid já
sejam visíveis rodando o projeto localmente. Substitua por fotografia e
renders reais mantendo os mesmos nomes/proporções indicados em cada JSON
(`orientation: "landscape" | "portrait" | "square"`), e o layout se ajusta
automaticamente.

## Gerando o PDF do portfólio

```bash
npm run pdf:build
```

Gera `public/documents/gabriel-marinho-portfolio.pdf` usando exatamente os
mesmos arquivos `src/content/projects/*.json` e `src/content/site.json` que
alimentam o site — nenhum texto é duplicado entre as duas saídas. O botão
"Baixar currículo em PDF" na página `/curriculo` aponta para esse arquivo.

## Performance & SEO

- Imagens servidas via `next/image` (AVIF/WebP, tamanhos responsivos
  configurados em `next.config.mjs`).
- Fontes otimizadas via `next/font/google` (sem layout shift, self-hosted
  no build).
- `sitemap.ts` e `robots.ts` gerados dinamicamente a partir da lista de
  projetos — todo projeto novo entra automaticamente no sitemap.
- Metadata e Open Graph por página via `generateMetadata` (inclusive por
  projeto, com imagem de capa própria).
- Movimento respeita `prefers-reduced-motion` (Lenis é desativado; Framer
  Motion e CSS reduzem transições globalmente via `globals.css`).
- Foco visível (`:focus-visible`) mantido em todo componente interativo.

## Próximos passos sugeridos

- Substituir as imagens placeholder por fotografia/renders reais.
- Registrar domínio e configurar variáveis de metadata (`SITE_URL` em
  `layout.tsx` e `sitemap.ts`) para o domínio definitivo.
- Adicionar Google Analytics/Plausible, se desejado, no `layout.tsx`.
- Deploy na Vercel: `vercel --prod` ou import direto do repositório Git.
