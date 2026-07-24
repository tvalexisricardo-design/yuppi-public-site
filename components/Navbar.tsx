import Link from "next/link";
import Image from "next/image";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-canvas/85 backdrop-blur-md">
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2" aria-label="Yuppi — página inicial">
          <Image
            src="/yuppi-logo.png"
            alt="Yuppi — festas incríveis, momentos felizes"
            width={132}
            height={132}
            priority
            className="h-11 w-auto"
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link href="/sobre-nos" className="text-sm font-medium text-inkSoft hover:text-ink transition-colors">
            Sobre Nós
          </Link>
          <Link href="/#como-funciona" className="text-sm font-medium text-inkSoft hover:text-ink transition-colors">
            Como funciona
          </Link>
          <Link href="/categorias" className="text-sm font-medium text-inkSoft hover:text-ink transition-colors">
            Categorias
          </Link>
          <Link href="/blog" className="text-sm font-medium text-inkSoft hover:text-ink transition-colors">
            Blog
          </Link>
          <Link
            href="/torna-te-parceiro"
            className="text-sm font-medium text-inkSoft hover:text-ink transition-colors"
          >
            Sou profissional
          </Link>
          <Link href="/contactos" className="text-sm font-medium text-inkSoft hover:text-ink transition-colors">
            Contactos
          </Link>
        </div>

        <Link
          href="/#pedir-orcamento"
          className="rounded-full bg-violet px-5 py-2.5 text-sm font-semibold text-white shadow-card transition-transform hover:scale-[1.03] hover:bg-violet-dark"
        >
          Pedir Orçamento
        </Link>
      </nav>
    </header>
  );
}
