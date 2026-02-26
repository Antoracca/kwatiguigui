import {
  Briefcase,
  Heart,
  HelpCircle,
  Info,
  MapPin,
  MessageCircle,
  Phone,
  Shield,
} from "lucide-react";
import Link from "next/link";

const FOOTER_LINKS = {
  plateforme: [
    { href: "/jobs", label: "Offres d'emploi", icon: Briefcase },
    { href: "/info", label: "Infos emploi", icon: Info },
    { href: "/register", label: "Inscription gratuite", icon: null },
  ],
  entreprise: [
    { href: "/about", label: "A propos", icon: null },
    { href: "/terms", label: "Conditions d'utilisation", icon: Shield },
    { href: "/help", label: "Centre d'aide", icon: HelpCircle },
  ],
  contact: [
    {
      href: "https://wa.me/23674143434",
      label: "+236 74 14 34 34",
      icon: MessageCircle,
      external: true,
    },
    {
      href: "tel:+23674143434",
      label: "Orange Money: 74 14 34 34",
      icon: Phone,
      external: true,
    },
    {
      href: "tel:+23676169090",
      label: "Telecel Money: 76 16 90 90",
      icon: Phone,
      external: true,
    },
  ],
} as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 font-heading text-heading-sm font-bold text-primary-500"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500 text-white">
                <span className="text-body-sm font-bold">K</span>
              </div>
              KWATIGUIGUI
            </Link>
            <p className="text-body-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
              La premiere plateforme d'emploi de la Republique Centrafricaine.
              Connectons employeurs et chercheurs d'emploi dans les 20 regions
              du pays.
            </p>
            <div className="flex items-center gap-1 text-body-xs text-neutral-400">
              <MapPin size={14} />
              Bangui, Republique Centrafricaine
            </div>
          </div>

          {/* Plateforme */}
          <div>
            <h3 className="mb-4 font-heading text-body-sm font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
              Plateforme
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.plateforme.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-neutral-500 transition-colors hover:text-primary-500 dark:text-neutral-400 dark:hover:text-primary-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Entreprise */}
          <div>
            <h3 className="mb-4 font-heading text-body-sm font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
              Informations
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.entreprise.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-neutral-500 transition-colors hover:text-primary-500 dark:text-neutral-400 dark:hover:text-primary-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-heading text-body-sm font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
              Contact
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.contact.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-body-sm text-neutral-500 transition-colors hover:text-primary-500 dark:text-neutral-400 dark:hover:text-primary-400"
                  >
                    {link.icon && <link.icon size={16} />}
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-200 pt-8 dark:border-neutral-800 sm:flex-row">
          <p className="text-body-xs text-neutral-400">
            &copy; {currentYear} KWATIGUIGUI. Tous droits reserves.
          </p>
          <p className="flex items-center gap-1 text-body-xs text-neutral-400">
            Fait avec <Heart size={12} className="text-error-500" /> en
            Republique Centrafricaine
          </p>
        </div>
      </div>
    </footer>
  );
}
