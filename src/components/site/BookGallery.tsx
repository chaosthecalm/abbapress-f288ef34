import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { ClientOnly } from "@/components/ClientOnly";
import { BookScene } from "@/components/webgl/BookScene";
import { BOOKS } from "@/data/books";

/**
 * Scroll-driven WebGL acervo. The section is tall; the canvas is pinned.
 * Scroll progress is written into a ref (never state) so the render loop
 * never triggers a React re-render — only the active-title readout does.
 */
export function BookGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const hoveredRef = useRef<number | null>(null);
  const [active, setActive] = useState(0);
  const [hovered, setHoveredState] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const max = BOOKS.length - 1;
    const p = Math.max(0, Math.min(1, v)) * max;
    progress.current = p;
    const idx = Math.round(p);
    setActive((prev) => (prev === idx ? prev : idx));
  });

  const setHovered = useCallback((i: number | null) => {
    hoveredRef.current = i;
    setHoveredState(i);
  }, []);

  const onFocus = useCallback((i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const max = BOOKS.length - 1;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: el.offsetTop + (i / max) * travel, behavior: "smooth" });
  }, []);

  const shown = BOOKS[hovered ?? active] ?? BOOKS[0]!;

  return (
    <section
      id="acervo"
      ref={sectionRef}
      className="relative"
      style={{ height: `${BOOKS.length * 62 + 100}vh` }}
      aria-label="Acervo Abba Press em 3D"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-royal-scene">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,color-mix(in_oklab,var(--royal)_45%,transparent),transparent_65%)]"
        />

        <ClientOnly
          fallback={
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="eyebrow animate-pulse">Preparando o acervo</span>
            </div>
          }
        >
          <div className="absolute inset-0">
            <BookScene
              books={BOOKS}
              progress={progress}
              hovered={hoveredRef}
              setHovered={setHovered}
              onFocus={onFocus}
            />
          </div>
        </ClientOnly>

        {/* Section label */}
        <div className="pointer-events-none absolute inset-x-0 top-24 z-10 px-6 text-center lg:top-28">
          <p className="eyebrow">O acervo</p>
          <h2 className="mt-3 text-3xl text-pearl sm:text-4xl lg:text-5xl">
            Role para <span className="text-gild italic">folhear</span> a coleção
          </h2>
        </div>

        {/* Active-book readout */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-background via-background/85 to-transparent pb-10 pt-24">
          <div className="mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={shown.id}
                initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center"
              >
                <span className="eyebrow">{shown.category}</span>
                <h3 className="mt-3 max-w-2xl text-2xl leading-tight text-pearl sm:text-4xl">
                  {shown.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm text-pearl/65">{shown.blurb}</p>
                <div className="mt-5 flex items-center gap-4">
                  {shown.oldPrice ? (
                    <span className="text-sm text-pearl/40 line-through">{shown.oldPrice}</span>
                  ) : null}
                  <span className="font-display text-3xl text-gold">{shown.price}</span>
                </div>
              </motion.div>
            </AnimatePresence>

            <a
              href={shown.href}
              target="_blank"
              rel="noreferrer"
              className="pointer-events-auto mt-7 rounded-sm border border-gold/60 px-7 py-3 text-[0.68rem] font-bold tracking-[0.24em] text-gold uppercase transition-all duration-300 hover:bg-gold hover:text-accent-foreground"
            >
              Ver este título
            </a>

            {/* progress rail */}
            <div className="mt-9 flex w-full max-w-md items-center gap-3">
              <span className="font-display text-sm text-pearl/60">
                {String(active + 1).padStart(2, "0")}
              </span>
              <div className="relative h-px flex-1 bg-border">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gold"
                  style={{ scaleX: scrollYProgress, originX: 0, width: "100%" }}
                />
              </div>
              <span className="font-display text-sm text-pearl/60">
                {String(BOOKS.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
