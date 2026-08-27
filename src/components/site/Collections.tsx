import { motion } from "motion/react";
import { COLLECTIONS } from "@/data/books";

export function Collections() {
  return (
    <section id="colecoes" className="relative py-32 lg:py-44" aria-label="Coleções">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Coleções</p>
            <h2 className="mt-4 max-w-xl text-4xl leading-tight text-pearl lg:text-5xl">
              Seis caminhos para <span className="text-gild italic">estudar</span> a Escritura
            </h2>
          </div>
          <a
            href="https://abbapress.com.br/loja/"
            target="_blank"
            rel="noreferrer"
            className="text-[0.68rem] font-bold tracking-[0.24em] text-gold uppercase underline decoration-gold/40 underline-offset-8 transition-opacity hover:opacity-70"
          >
            Ver loja completa
          </a>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {COLLECTIONS.map((c, i) => (
            <motion.a
              key={c.name}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08 }}
              className="group relative overflow-hidden bg-card p-9 transition-colors duration-500 hover:bg-secondary"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100"
              />
              <p className="text-[0.62rem] tracking-[0.28em] text-muted-foreground uppercase">
                {c.count}
              </p>
              <h3 className="mt-5 text-2xl text-pearl transition-colors group-hover:text-gold">
                {c.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-pearl/60">{c.note}</p>
              <span className="mt-8 inline-flex items-center gap-2 text-xs tracking-[0.2em] text-gold/70 uppercase">
                Explorar
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
