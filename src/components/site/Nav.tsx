import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { useState } from "react";
import { LOGO_URL, WHATSAPP_URL } from "@/data/books";

const LINKS = [
  { label: "Acervo", href: "#acervo" },
  { label: "Coleções", href: "#colecoes" },
  { label: "Quem somos", href: "#editora" },
  { label: "Publique", href: "#publique" },
];

export function Nav() {
  const [solid, setSolid] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 80));

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`transition-all duration-500 ${
          solid
            ? "border-b border-border bg-background/80 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <a href="#top" className="flex items-center gap-3" aria-label="Abba Press — início">
            <img
              src={LOGO_URL}
              alt="Logotipo Abba Press"
              className="h-11 w-auto drop-shadow-[0_0_18px_rgba(255,255,255,0.25)]"
            />
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-lg tracking-wide text-pearl">Abba Press</span>
              <span className="text-[0.6rem] tracking-[0.3em] text-muted-foreground uppercase">
                Editora
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-9 md:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative text-sm text-pearl/80 transition-colors hover:text-pearl"
                >
                  {l.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="https://abbapress.com.br/minha-conta/"
              className="hidden text-sm text-pearl/70 transition-colors hover:text-gold sm:block"
            >
              Entrar
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-sm border border-gold/50 bg-gold/10 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-gold uppercase transition-all duration-300 hover:bg-gold hover:text-accent-foreground"
            >
              Comprar
            </a>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
