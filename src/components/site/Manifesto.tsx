import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const LINES = [
  "Há trinta anos publicamos com um único critério:",
  "fidelidade ao texto sagrado e cuidado com quem o lê.",
  "Cada Bíblia, cada comentário, cada página costurada",
  "existe para que a Palavra chegue inteira ao Brasil.",
];

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const glow = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.6, 0.1]);

  return (
    <section
      id="editora"
      ref={ref}
      className="relative overflow-hidden py-40 lg:py-56"
      aria-label="Quem somos"
    >
      <motion.div
        style={{ opacity: glow }}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--royal-light)_40%,transparent),transparent_70%)] blur-3xl"
      />

      <div className="relative mx-auto max-w-4xl px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="eyebrow text-center"
        >
          A editora
        </motion.p>

        <div className="mt-12 space-y-4 text-center">
          {LINES.map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 1, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-2xl leading-snug text-pearl/90 sm:text-3xl lg:text-[2.6rem]"
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="rule-gild mx-auto mt-16 w-40 origin-center"
        />

        <div className="mt-16 grid gap-10 sm:grid-cols-3">
          {[
            { n: "1996", l: "Ano de fundação" },
            { n: "+300", l: "Títulos publicados" },
            { n: "KJA", l: "Tradução de referência" },
          ].map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="font-display text-4xl text-gild">{s.n}</p>
              <p className="mt-2 text-[0.68rem] tracking-[0.24em] text-muted-foreground uppercase">
                {s.l}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
