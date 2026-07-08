import { Reveal } from "./Reveal";
import { DraftMark } from "./DraftMark";
import type { Project } from "@/types/project";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="break-inside-avoid pb-6">
      <dt className="draft-mark mb-1.5">{label}</dt>
      <dd className="text-ink font-medium">{value}</dd>
    </div>
  );
}

/**
 * Ficha Técnica no espírito de memoriais de escritório: uma lista objetiva
 * de rótulo/valor (local, data, cliente, áreas, equipe por disciplina,
 * softwares), lida em poucos segundos — o contraponto direto ao Memorial,
 * que é para ler com calma.
 */
export function FichaTecnica({ project }: { project: Project }) {
  return (
    <div id="ficha-tecnica" className="scroll-mt-36">
      <DraftMark label="Ficha Técnica" className="mb-8 block" />

      <dl className="columns-1 gap-x-12 sm:columns-2 lg:columns-3">
        <Reveal>
          <Field label="Local" value={project.location} />
        </Reveal>
        <Reveal delay={0.03}>
          <Field label="Data" value={project.year} />
        </Reveal>
        {project.client && (
          <Reveal delay={0.06}>
            <Field label="Cliente" value={project.client} />
          </Reveal>
        )}
        {project.area && (
          <Reveal delay={0.09}>
            <Field label="Área construída" value={project.area} />
          </Reveal>
        )}
        <Reveal delay={0.12}>
          <Field label="Status" value={project.status} />
        </Reveal>

        {project.team.map((member, i) => (
          <Reveal key={member.name} delay={0.15 + i * 0.03}>
            <Field label={member.role} value={member.name} />
          </Reveal>
        ))}

        <Reveal delay={0.3}>
          <Field
            label="Softwares utilizados"
            value={project.software.join(" · ")}
          />
        </Reveal>
      </dl>
    </div>
  );
}
