import { motion } from "motion/react";
import { WHATSAPP_URL } from "@/data/books";

export function Publish() {
  return (
    <section
      id="publique"
      className="relative overflow-hidden border-y border-border py-32 lg:py-44"
      aria-label="Quero publicar"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,color-mix(in_oklab,var(--royal)_50%,transparent),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-[-10%] h-[70vh] w-[70vh] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--gold)_16%,transparent),transparent_65%)] blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl gap-16 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow">Quero publicar</p>
          <h2 className="mt-5 text-4xl leading-tight text-pearl lg:text-6xl">
            Seu manuscrito merece
            <br />
            <span className="text-gild italic">papel, tinta e cuidado</span>
          </h2>
          <p className="mt-7 max-w-lg text-base leading-relaxed text-pearl/70">
            Avaliamos originais de teologia, vida cristã, família e evangelismo. Da leitura
            crítica ao projeto gráfico, acompanhamos cada etapa com o mesmo rigor editorial das
            nossas Bíblias.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href="https://abbapress.com.br/quero-publicar/"
              target="_blank"
              rel="noreferrer"
              className="rounded-sm bg-gold px-8 py-4 text-center text-xs font-bold tracking-[0.22em] text-accent-foreground uppercase transition-transform duration-300 hover:scale-[1.03]"
            >
              Enviar meu original
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="text-center text-xs font-semibold tracking-[0.22em] text-pearl/70 uppercase transition-colors hover:text-gold"
            >
              Falar com a editora
            </a>
          </div>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="divide-y divide-border border-y border-border"
        >
          {[
            { k: "01", t: "Leitura crítica", d: "Parecer teológico e editorial em até 60 dias." },
            { k: "02", t: "Preparação de texto", d: "Copidesque, revisão e normalização bíblica." },
            { k: "03", t: "Projeto gráfico", d: "Capa, miolo e acabamento pensados para durar." },
            { k: "04", t: "Distribuição", d: "Loja própria, livrarias parceiras e igrejas." },
          ].map((s) => (
            <li key={s.k} className="flex gap-6 py-7">
              <span className="font-display text-xl text-gold/70">{s.k}</span>
              <div>
                <p className="text-lg text-pearl">{s.t}</p>
                <p className="mt-1 text-sm text-pearl/60">{s.d}</p>
              </div>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
