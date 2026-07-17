import Link from "next/link";
import Image from "next/image";
import { SocialLinks } from "@/components/SocialLinks";

const categories = ["Animadores", "Mágicos", "Mascotes", "Pinturas Faciais", "Modelagem de Balões", "Insufláveis", "Decoração", "Fotografia", "DJ / Música"];

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
              A tua festa. Tudo num só lugar.
            </p>
            <a
              href="mailto:hello@yuppi.pt"
              className="mt-4 inline-block text-sm font-medium text-violet hover:text-violet-dark"
            >
              hello@yuppi.pt
            </a>
            <a
              href="tel:+351922008673"
              className="mt-1.5 block text-sm font-medium text-violet hover:text-violet-dark"
            >
              922 008 673
            </a>
            <p className="mt-3 text-xs text-inkSoft">Horário: 10h – 18h</p>
            <SocialLinks />
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink">
              Famílias
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-inkSoft">
              <li><Link href="/#como-funciona" className="hover:text-ink">Como funciona</Link></li>
              <li><Link href="/categorias" className="hover:text-ink">Categorias</Link></li>
              <li><Link href="/profissionais" className="hover:text-ink">Profissionais</Link></li>
              <li><Link href="/blog" className="hover:text-ink">Blog</Link></li>
              <li><Link href="/#pedir-orcamento" className="hover:text-ink">Pedir orçamento</Link></li>
              <li><Link href="/contactos" className="hover:text-ink">Contactos</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink">
              Profissionais
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-inkSoft">
              <li><Link href="/torna-te-parceiro" className="hover:text-ink">Torna-te Parceiro</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-ink">
              Categorias
            </h3>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-inkSoft">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link href="/categorias" className="hover:text-ink">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-black/5 pt-8 text-xs text-inkSoft md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Yuppi. Todos os direitos reservados.</p>
          <p>Feito em Portugal, para famílias portuguesas.</p>
        </div>
      </div>
    </footer>
  );
}
