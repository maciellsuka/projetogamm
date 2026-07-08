# Design System — Gabriel Augusto Moreira Marinho / Arquitetura

Sistema mínimo, construído para uma experiência editorial. Todo token abaixo
está implementado em `tailwind.config.ts` e `src/app/globals.css` — este
documento é a referência de intenção por trás de cada escolha.

## 1. Direção editorial

Referência: publicações de arquitetura de alto padrão (o objeto é o
protagonista; a interface é quase invisível). Não é um portfólio acadêmico
nem um site institucional de escritório genérico.

**Elemento-assinatura:** a "marca de prancha" (`DraftMark`) — pequenas
anotações em caixa-alta e monoespaçado, inspiradas em legendas de desenho
técnico (coordenadas, escala, norte). Aparece em cabeçalhos de seção, rodapés
de página de projeto e como metadado sobre imagens. É o único elemento
"decorativo" do sistema — todo o resto é espaço, tipografia e a foto/desenho
em si.

## 2. Paleta

| Token    | Hex       | Uso |
|----------|-----------|-----|
| `paper`  | `#F5F3EE` | Fundo base — branco quente, nunca branco puro |
| `ink`    | `#14130F` | Texto primário, fundos escuros (hero, galeria) |
| `stone`  | `#8B8579` | Texto secundário, legendas, metadados |
| `line`   | `#D8D3C7` | Hairlines, divisores, placeholders de imagem |
| `clay`   | `#6B5A45` | Único acento de cor — links ativos, marca de assinatura |

Regra: no máximo uma cor de destaque (`clay`) por composição. Nunca duas
cores de acento na mesma tela.

## 3. Tipografia

- **Display — Fraunces** (serifada editorial, peso 300–500, com itálico).
  Usada apenas em títulos (H1/H2) e citações. Nunca em corpo de texto ou UI.
- **Body — Inter** (grotesk neutro). Corpo de texto, navegação, botões.
- **Mono — IBM Plex Mono**. Reservada às "marcas de prancha": legendas,
  datas, metadados técnicos (ano, área, software).

Escala (`tailwind.config.ts → fontSize`): `display-xl`, `display-lg`,
`display-md`, `eyebrow`, `body-lg`, `body`, `caption`. Poucos tamanhos,
usados de forma consistente — nunca um tamanho "único" criado ad hoc numa
página.

## 4. Grid & espaçamento

- Container: `max-w-[1200px]` para texto/leitura, `max-w-editorial` (1600px)
  para composições de imagem em largura total.
- Espaçamento generoso entre seções: `py-24` a `py-34` (6–8.5rem) — o "muito
  espaço em branco" pedido no brief é um token, não uma sugestão solta.
- Grid de 12 colunas via classes utilitárias do Tailwind (`lg:grid-cols-12`),
  com colunas assimétricas (ex. 5/7, 4/7) para evitar a sensação de tabela.

## 5. Movimento

- **Framer Motion**: fade + deslocamento vertical leve (`Reveal`), sempre com
  a mesma curva de easing (`cubic-bezier(0.22, 1, 0.36, 1)`), para que o
  movimento pareça um sistema, não efeitos pontuais.
- **Lenis**: smooth scroll global, desativado automaticamente quando o
  usuário tem `prefers-reduced-motion` ativado.
- **GSAP**: reservado a um único detalhe por página de projeto — o reveal do
  título com `clip-path` no `ProjectHero`. Não é usado em mais lugar nenhum,
  de propósito.

## 6. Componentes reutilizáveis

`Container`, `Reveal`, `SectionTitle`, `Quote`, `Button`, `DraftMark`,
`Navbar`, `Footer`, `Hero`, `ProjectHero`, `ProjectCard`, `ImageGrid`,
`Gallery`, `Lightbox`, `SmoothScroll`. Nenhuma página compõe HTML/estilos
soltos fora desses blocos — isso é o que permite adicionar um projeto novo
sem tocar em nenhum componente.

## 7. Tom de voz

- Primeira pessoa, direta, sem jargão de marketing ("soluções", "sinergia").
- Frases curtas para afirmações de posicionamento; parágrafos mais longos
  para explicar processo e método.
- Cada projeto é narrado como um estudo de caso: contexto → escuta →
  conceito → técnica → resultado. Nunca como uma lista de adjetivos
  ("moderno", "sofisticado", "único").
- Exemplo de frase-âncora usada no site: *"Projetar é compreender antes de
  desenhar."*

## 8. Como isso evita o "genérico"

Este sistema deliberadamente **não** usa: fundo creme + serifa de alto
contraste + acento terracota (o padrão mais comum em design gerado por IA
hoje), nem grid jornalístico denso de hairlines em preto puro. A paleta é
mais fria e mineral (pedra, taipa, concreto), o acento é um marrom-argila
opaco (não um laranja vibrante), e o elemento de assinatura vem do
vocabulário técnico da própria arquitetura (prancha, escala, coordenada),
não de um recurso gráfico genérico.
