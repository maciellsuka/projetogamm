/**
 * Gera um portfólio em PDF a partir do MESMO conteúdo usado pelo site
 * (src/content/projects/*.json + src/content/site.json).
 *
 * Rodar com: npm run pdf:build
 * Saída: public/documents/gabriel-marinho-portfolio.pdf
 *
 * Isso cumpre o requisito de "site e PDF compartilham o mesmo conteúdo":
 * qualquer alteração num JSON de projeto se reflete tanto na página web
 * quanto na próxima geração do PDF, sem precisar duplicar textos.
 */
import fs from "node:fs";
import path from "node:path";
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  renderToBuffer,
} from "@react-pdf/renderer";

import siteContent from "../src/content/site.json";
import casaraoAzul from "../src/content/projects/casarao-azul.json";
import apartamentoJd from "../src/content/projects/apartamento-jd.json";
import ubsVilaEsperanca from "../src/content/projects/ubs-vila-esperanca.json";

const projects = [casaraoAzul, apartamentoJd, ubsVilaEsperanca].sort(
  (a, b) => a.order - b.order,
);

const styles = StyleSheet.create({
  page: {
    padding: 48,
    fontSize: 11,
    color: "#14130F",
    fontFamily: "Helvetica",
  },
  coverTitle: { fontSize: 32, marginBottom: 8 },
  coverRole: { fontSize: 14, color: "#6B5A45", marginBottom: 24 },
  coverTagline: { fontSize: 14, lineHeight: 1.5, maxWidth: 380 },
  eyebrow: {
    fontSize: 9,
    letterSpacing: 2,
    color: "#8B8579",
    marginBottom: 6,
    textTransform: "uppercase",
  },
  projectTitle: { fontSize: 20, marginBottom: 4 },
  projectMeta: { fontSize: 10, color: "#8B8579", marginBottom: 12 },
  paragraph: { fontSize: 11, lineHeight: 1.6, marginBottom: 10 },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: "#D8D3C7",
    marginVertical: 16,
  },
  teamRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
});

function PortfolioDocument() {
  const { identity } = siteContent;

  return (
    <Document title={`${identity.name} — Portfólio`} author={identity.name}>
      <Page size="A4" style={styles.page}>
        <Text style={styles.coverTitle}>{identity.name}</Text>
        <Text style={styles.coverRole}>{identity.role.toUpperCase()}</Text>
        <Text style={styles.coverTagline}>{identity.tagline}</Text>
      </Page>

      {projects.map((project) => (
        <Page key={project.slug} size="A4" style={styles.page}>
          <Text style={styles.eyebrow}>{project.categoryLabel}</Text>
          <Text style={styles.projectTitle}>{project.title}</Text>
          <Text style={styles.projectMeta}>
            {project.year} — {project.location}
            {project.area ? ` — ${project.area}` : ""}
            {project.client ? ` — Cliente: ${project.client}` : ""}
          </Text>

          <View style={styles.hr} />

          {project.memorial.map((paragraph, i) => (
            // O PDF usa texto plano: remove a marcação **negrito** usada no site.
            <Text key={i} style={styles.paragraph}>
              {paragraph.replace(/\*\*([^*]+)\*\*/g, "$1")}
            </Text>
          ))}

          <View style={styles.hr} />

          <Text style={styles.eyebrow}>Equipe</Text>
          {project.team.map((m) => (
            <View key={m.name} style={styles.teamRow}>
              <Text>{m.name}</Text>
              <Text style={{ color: "#8B8579" }}>{m.role}</Text>
            </View>
          ))}

          <Text style={[styles.eyebrow, { marginTop: 12 }]}>
            Softwares utilizados
          </Text>
          <Text>{project.software.join(" · ")}</Text>

          <View style={styles.hr} />
          <Text style={styles.paragraph}>{project.conclusion}</Text>
        </Page>
      ))}
    </Document>
  );
}

async function main() {
  const buffer = await renderToBuffer(<PortfolioDocument />);
  const outDir = path.join(process.cwd(), "public", "documents");
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, "gabriel-marinho-portfolio.pdf");
  fs.writeFileSync(outPath, buffer);
  console.log(`PDF gerado em ${outPath}`);
}

main();
