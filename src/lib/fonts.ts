import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";

// Display: Fraunces — serif editorial com contraste alto, usado com restrição
// (headlines e títulos de seção apenas). Traz a sensibilidade de uma
// publicação impressa sem cair no serifado "acadêmico" padrão.
export const display = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

// Body: Inter — grotesk neutro e altamente legível para corpo de texto e UI.
export const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

// Mono: usado apenas em legendas técnicas, coordenadas, metadados de projeto
// (ano, área, software) — remete à anotação de pranchas técnicas.
export const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});
