import vulgata from "@/assets/books/vulgata.jpg.asset.json";
import kjaMarrom from "@/assets/books/kja-marrom.jpg.asset.json";
import lucas from "@/assets/books/lucas.jpg.asset.json";
import parafrase from "@/assets/books/parafrase.jpg.asset.json";
import vintage from "@/assets/books/vintage.jpg.asset.json";
import igreja from "@/assets/books/igreja.jpg.asset.json";
import rute from "@/assets/books/rute.jpg.asset.json";
import curas from "@/assets/books/curas.webp.asset.json";
import ageu from "@/assets/books/ageu.jpg.asset.json";
import mulher from "@/assets/books/mulher.jpg.asset.json";
import logo from "@/assets/books/logo.png.asset.json";
import heroVideo from "@/assets/hero-cathedral.mp4.asset.json";

export const LOGO_URL = logo.url;
export const HERO_VIDEO_URL = heroVideo.url;

export type Book = {
  id: string;
  title: string;
  category: string;
  price: string;
  oldPrice?: string;
  cover: string;
  href: string;
  /** Spine + edge colour, in hex, sampled to match each physical edition. */
  spine: string;
  blurb: string;
};

export const BOOKS: Book[] = [
  {
    id: "vulgata",
    title: "Bíblia Sacra Vulgata",
    category: "Bíblia · Latim/Português",
    price: "R$52,00",
    oldPrice: "R$105,00",
    cover: vulgata.url,
    href: "https://abbapress.com.br/produto/biblia-sacra-vulgata-latim-portugues/",
    spine: "#7c1f1c",
    blurb: "Os quatro Evangelhos em edição bilíngue, fiel ao texto de São Jerônimo.",
  },
  {
    id: "curas",
    title: "Bíblia KJA Curas e Milagres",
    category: "Bíblia · Luxo",
    price: "R$150,00",
    oldPrice: "R$300,00",
    cover: curas.url,
    href: "https://abbapress.com.br/produto/biblia-kja-curas-e-milagres-luxo-capa-preta/",
    spine: "#1b1b1b",
    blurb: "Edição luxo com estudos temáticos sobre o poder restaurador de Deus.",
  },
  {
    id: "lucas",
    title: "Comentário Pastoral — Lucas",
    category: "Comentários Bíblicos",
    price: "R$51,00",
    oldPrice: "R$104,00",
    cover: lucas.url,
    href: "https://abbapress.com.br/produto/comentario-pastoral-da-biblia-kja-lucas/",
    spine: "#123a63",
    blurb: "Exposição versículo a versículo do Evangelho, para púlpito e estudo.",
  },
  {
    id: "kja-marrom",
    title: "Bíblia King James Atualizada",
    category: "Bíblia · Luxo com índice",
    price: "R$75,00",
    oldPrice: "R$150,00",
    cover: kjaMarrom.url,
    href: "https://abbapress.com.br/produto/biblia-king-james-atualizada-kja-luxo-sem-estudo-com-indice-marrom/",
    spine: "#5a3220",
    blurb: "Letra hipergigante, acabamento luxo marrom e índice digital lateral.",
  },
  {
    id: "parafrase",
    title: "Bíblia em Paráfrase",
    category: "Bíblia",
    price: "R$45,00",
    oldPrice: "R$99,00",
    cover: parafrase.url,
    href: "https://abbapress.com.br/produto/biblia-em-parafrase/",
    spine: "#8a6b2f",
    blurb: "Novo Testamento em linguagem viva, para uma leitura devocional fluida.",
  },
  {
    id: "vintage",
    title: "Bíblia KJA de Estudo Vintage",
    category: "Bíblia · Capa dura",
    price: "R$55,00",
    oldPrice: "R$110,00",
    cover: vintage.url,
    href: "https://abbapress.com.br/produto/biblia-kja-de-estudo-capa-dura-vintage/",
    spine: "#6b4a1e",
    blurb: "Capa dura de inspiração clássica com aparato completo de estudo.",
  },
  {
    id: "igreja",
    title: "Igreja, Corpo Vivo de Cristo",
    category: "Comentários Bíblicos",
    price: "R$27,00",
    oldPrice: "R$54,00",
    cover: igreja.url,
    href: "https://abbapress.com.br/produto/igreja-corpo-vivo-de-cristo/",
    spine: "#c98a1e",
    blurb: "Ray Stedman sobre a vocação da comunidade cristã no mundo.",
  },
  {
    id: "rute",
    title: "Comentário Pastoral — Rute",
    category: "Comentários Bíblicos",
    price: "R$27,00",
    oldPrice: "R$54,00",
    cover: rute.url,
    href: "https://abbapress.com.br/produto/comentario-pastoral-da-biblia-kja-rute/",
    spine: "#4a2a52",
    blurb: "Redenção, aliança e providência na mais terna narrativa do Antigo Testamento.",
  },
  {
    id: "ageu",
    title: "Comentário — Ageu e Zacarias",
    category: "Comentários Bíblicos",
    price: "R$35,00",
    oldPrice: "R$57,00",
    cover: ageu.url,
    href: "https://abbapress.com.br/produto/comentario-pastoral-da-biblia-kja-ageu-e-zacarias/",
    spine: "#1f5145",
    blurb: "Os profetas da reconstrução e o chamado a reedificar a casa do Senhor.",
  },
  {
    id: "mulher",
    title: "A Medida de Uma Mulher Espiritual",
    category: "Família",
    price: "R$34,50",
    oldPrice: "R$69,00",
    cover: mulher.url,
    href: "https://abbapress.com.br/produto/medida-de-uma-mulher-espiritual/",
    spine: "#a3405c",
    blurb: "Um retrato bíblico de maturidade, graça e força interior.",
  },
];

export const COLLECTIONS = [
  {
    name: "Bíblias",
    count: "12 títulos",
    href: "https://abbapress.com.br/categoria-produto/biblia/",
    note: "King James Atualizada, Vulgata, edições luxo e letra hipergigante.",
  },
  {
    name: "Comentários Bíblicos",
    count: "Série pastoral",
    href: "https://abbapress.com.br/categoria-produto/comentarios-biblicos/",
    note: "Exposição livro a livro, escrita para quem ensina a Palavra.",
  },
  {
    name: "Vida Cristã",
    count: "Devocional",
    href: "https://abbapress.com.br/categoria-produto/vida-crista/",
    note: "Leituras para o dia a dia da fé, oração e caráter.",
  },
  {
    name: "Família & Aconselhamento",
    count: "Relacionamentos",
    href: "https://abbapress.com.br/categoria-produto/familia/",
    note: "Casamento, maternidade e cuidado pastoral com base bíblica.",
  },
  {
    name: "Evangelismo",
    count: "Missão",
    href: "https://abbapress.com.br/categoria-produto/evangelismo/",
    note: "Títulos breves e acessíveis para distribuir e semear.",
  },
  {
    name: "Estudos Bíblicos",
    count: "Grupos",
    href: "https://abbapress.com.br/categoria-produto/estudos-biblicos/",
    note: "Materiais para células, discipulado e escola bíblica.",
  },
];

export const WHATSAPP_URL =
  "https://wa.me/5511993725358?text=Ol%C3%A1%2C%20quero%20falar%20com%20a%20Abba%20Press.";
