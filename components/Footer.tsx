import Link from "next/link";
import Image from "next/image";
import { SocialLinks } from "@/components/SocialLinks";
import { SHOW_PROFISSIONAIS } from "@/lib/featureFlags";

const categories = [
  { name: "Animadores", slug: "animadores-infantis" },
  { name: "Mágicos", slug: "magicos-para-festas" },
  { name: "Mascotes", slug: "mascotes-para-festas" },
  { name: "Pinturas Faciais", slug: "pinturas-faciais" },
  { name: "Modelagem de Balões", slug: "modelagem-de-baloes" },
  { name: "Insufláveis", slug: "insuflaveis" },
  { name: "Decoração", slug: "decoracao-de-festas" },
  { name: "Fotografia", slug: "fotografia-para-festas" },
  { name: "DJ / Música", slug: "dj-musica" },
];

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-canvasSoft">
      <div className="mx-auto max-w-content px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Image
              src="/yuppi-logo.png"
              alt="Yuppi"
              width={132}
              height={81}
              className="h-11 w-auto"
            />
            <p className="mt-4 text-sm text-inkSoft">
              Descobre profissionais e ideias para festas infantis em Portugal.
            </p>
            <SocialLinks />
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink">
              Famílias
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-inkSoft">
              <li><Link href="/categorias" className="hover:text-ink">Categorias</Link></li>
              <li><Link href="/blog" className="hover:text-ink">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink">
              Profissionais
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-inkSoft">
              <li><Link href="/torna-te-parceiro" className="hover:text-ink">Adicionar o meu negócio</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink">
              Categorias
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-inkSoft">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/${cat.slug}`} className="hover:text-ink">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-black/5 pt-8 text-xs text-inkSoft md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Yuppi. Todos os direitos reservados.</p>
          <div className="flex flex-wrap gap-5"><Link href="/privacidade" className="hover:text-ink">Privacidade e cookies</Link><p>Feito em Portugal, para famílias portuguesas.</p></div>
        </div>
      </div>
    </footer>
  );
}
