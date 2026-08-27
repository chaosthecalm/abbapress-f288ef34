import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { BookGallery } from "@/components/site/BookGallery";
import { Manifesto } from "@/components/site/Manifesto";
import { Collections } from "@/components/site/Collections";
import { Publish } from "@/components/site/Publish";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Abba Press — Bíblias, comentários pastorais e literatura cristã",
      },
      {
        name: "description",
        content:
          "Editora Abba Press: Bíblia King James Atualizada, Vulgata bilíngue e comentários pastorais. Percorra o acervo em 3D e compre com atendimento por WhatsApp e PIX.",
      },
      {
        property: "og:title",
        content: "Abba Press — Bíblias, comentários pastorais e literatura cristã",
      },
      {
        property: "og:description",
        content:
          "Um acervo imersivo de Bíblias e comentários bíblicos publicados pela Abba Press desde 1996.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative bg-background">
      <Nav />
      <Hero />
      <BookGallery />
      <Manifesto />
      <Collections />
      <Publish />
      <Footer />
    </main>
  );
}
