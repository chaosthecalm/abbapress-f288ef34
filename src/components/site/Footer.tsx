import { LOGO_URL, WHATSAPP_URL } from "@/data/books";

export function Footer() {
  return (
    <footer className="relative py-20" aria-label="Rodapé">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-12 lg:flex-row">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <img src={LOGO_URL} alt="Logotipo Abba Press" className="h-12 w-auto" />
              <span className="font-display text-xl text-pearl">Abba Press</span>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-pearl/55">
              Editora cristã dedicada a Bíblias, comentários pastorais e literatura de formação
              para igrejas e famílias brasileiras.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <p className="text-[0.62rem] tracking-[0.28em] text-muted-foreground uppercase">
                Navegue
              </p>
              <ul className="mt-5 space-y-3 text-sm text-pearl/70">
                <li>
                  <a className="transition-colors hover:text-gold" href="#acervo">
                    Acervo
                  </a>
                </li>
                <li>
                  <a className="transition-colors hover:text-gold" href="#colecoes">
                    Coleções
                  </a>
                </li>
                <li>
                  <a className="transition-colors hover:text-gold" href="#editora">
                    Quem somos
                  </a>
                </li>
                <li>
                  <a className="transition-colors hover:text-gold" href="#publique">
                    Quero publicar
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-[0.62rem] tracking-[0.28em] text-muted-foreground uppercase">
                Atendimento
              </p>
              <ul className="mt-5 space-y-3 text-sm text-pearl/70">
                <li>
                  <a
                    className="transition-colors hover:text-gold"
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp · compra via PIX
                  </a>
                </li>
                <li>
                  <a
                    className="transition-colors hover:text-gold"
                    href="https://abbapress.com.br/contato/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Contato
                  </a>
                </li>
                <li>
                  <a
                    className="transition-colors hover:text-gold"
                    href="https://abbapress.com.br/loja/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Loja oficial
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="rule-gild mt-16 opacity-30" />
        <p className="mt-8 text-xs text-pearl/40">
          © {new Date().getFullYear()} Abba Press. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
