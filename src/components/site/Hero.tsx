import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { HERO_VIDEO_URL, WHATSAPP_URL } from "@/data/books";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Cinematic dolly-out: the video plate recedes in Z while copy lifts away.
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.32]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const veilOpacity = useTransform(scrollYProgress, [0, 0.85], [0.55, 1]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const raysOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[168vh]"
      aria-label="Abba Press — apresentação"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-royal-scene">
        {/* Layer 1 — cinematic 3D video plate */}
        <motion.div
          style={{ scale: videoScale, y: videoY }}
          className="absolute inset-0 will-change-transform"
        >
          <video
            className="h-full w-full object-cover"
            src={HERO_VIDEO_URL}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        </motion.div>

        {/* Layer 2 — volumetric god rays */}
        <motion.div
          style={{ opacity: raysOpacity }}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 mix-blend-screen"
        >
          <div className="absolute -top-1/3 left-[12%] h-[160%] w-[18vw] -rotate-12 bg-[linear-gradient(to_bottom,color-mix(in_oklab,var(--gold)_28%,transparent),transparent_72%)] blur-2xl" />
          <div className="absolute -top-1/3 left-[42%] h-[160%] w-[10vw] -rotate-6 bg-[linear-gradient(to_bottom,color-mix(in_oklab,var(--gold-soft)_22%,transparent),transparent_65%)] blur-3xl" />
          <div className="absolute -top-1/3 right-[16%] h-[160%] w-[22vw] rotate-9 bg-[linear-gradient(to_bottom,color-mix(in_oklab,var(--royal-light)_30%,transparent),transparent_70%)] blur-3xl" />
        </motion.div>

        {/* Layer 3 — colour grade + vignette + film grain */}
        <motion.div
          style={{ opacity: veilOpacity }}
          aria-hidden="true"
          className="absolute inset-0 bg-veil"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,oklch(0.13_0.035_258/0.92)_100%)]"
        />
        <div aria-hidden="true" className="grain-layer absolute inset-0 opacity-40" />

        {/* Layer 4 — copy, with a 3D perspective lift */}
        <motion.div
          style={{ y: copyY, opacity: copyOpacity }}
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center [perspective:1200px]"
        >
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="eyebrow"
          >
            Editora Abba Press · desde 1996
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 60, rotateX: 28 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1.5, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-5xl text-5xl leading-[0.95] text-pearl sm:text-7xl lg:text-[5.75rem] [transform-style:preserve-3d]"
          >
            A Palavra que atravessa
            <br />
            <span className="text-gild italic">gerações</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="mt-8 max-w-xl text-base leading-relaxed text-pearl/70 sm:text-lg"
          >
            Bíblias King James Atualizada, a Vulgata bilíngue e comentários pastorais
            escritos para quem lê, ensina e vive as Escrituras no Brasil.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="mt-11 flex flex-col items-center gap-4 sm:flex-row"
          >
            <a
              href="#acervo"
              className="group relative overflow-hidden rounded-sm bg-gold px-8 py-4 text-xs font-bold tracking-[0.22em] text-accent-foreground uppercase transition-transform duration-300 hover:scale-[1.03]"
            >
              <span className="relative z-10">Percorrer o acervo</span>
              <span className="absolute inset-0 -translate-x-full bg-gold-soft transition-transform duration-500 group-hover:translate-x-0" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold tracking-[0.22em] text-pearl/70 uppercase underline decoration-gold/40 underline-offset-8 transition-colors hover:text-gold"
            >
              Comprar via WhatsApp / PIX
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          style={{ opacity: copyOpacity }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-[0.6rem] tracking-[0.32em] text-pearl/50 uppercase">
              Role para entrar
            </span>
            <motion.span
              animate={{ scaleY: [0.2, 1, 0.2], originY: 0 }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="h-14 w-px bg-gradient-to-b from-gold to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
