"use client";

import {
  ArrowUp,
  Briefcase,
  Heart,
  HelpCircle,
  Info,
  MapPin,
  MessageCircle,
  Phone,
  Shield,
  FileText,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const FOOTER_LINKS = {
  plateforme: [
    { href: "/jobs", label: "Offres d'emploi", icon: Briefcase },
    { href: "/info", label: "Infos emploi", icon: Info },
    { href: "/register", label: "Inscription gratuite", icon: null },
  ],
  entreprise: [
    { href: "/about", label: "A propos", icon: null },
    { href: "/legal", label: "Mentions Légales", icon: FileText },
    { href: "/privacy", label: "Politique de Confidentialité", icon: Shield },
    { href: "/terms", label: "CGV & CGU", icon: FileText },
    { href: "/help", label: "Centre d'aide", icon: HelpCircle },
  ],
  contact: [
    {
      href: "tel:+23674143434",
      label: "+236 74 14 34 34",
      icon: Phone,
      external: true,
    },
    {
      href: "mailto:support@kwatiguigui.org",
      label: "support@kwatiguigui.org",
      icon: Mail,
      external: false,
    },
    {
      href: "mailto:info@kwatiguigui.org",
      label: "info@kwatiguigui.org",
      icon: Mail,
      external: false,
    },
    {
      href: "mailto:team@kwatiguigui.org",
      label: "team@kwatiguigui.org",
      icon: Mail,
      external: false,
    },
  ],
} as const;

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950 relative">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:gap-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {/* Brand & Mission (Takes 2 columns on large screens) */}
          <div className="sm:col-span-2 lg:col-span-3 xl:col-span-2 space-y-6">
            <Link href="/" className="inline-block transition-transform hover:opacity-90 active:scale-95">
              <div className="relative h-12 w-48 sm:h-14 sm:w-56">
                {/* Mode clair */}
                <Image
                  src="/images/logoprincipal.png"
                  alt="Kwatiguigui"
                  fill
                  className="object-contain object-left block dark:hidden"
                  priority
                />
                {/* Mode sombre */}
                <Image
                  src="/images/logosecondaire.png"
                  alt="Kwatiguigui"
                  fill
                  className="object-contain object-left hidden dark:block"
                  priority
                />
              </div>
            </Link>
            <p className="text-body-sm leading-relaxed text-neutral-500 dark:text-neutral-400 max-w-sm">
              La première plateforme d'emploi de la République Centrafricaine. Connectons les talents exceptionnels et les entreprises ambitieuses dans les 20 régions du pays.
            </p>
            <div className="flex items-center gap-2 text-body-sm font-medium text-neutral-600 dark:text-neutral-300">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-50 dark:bg-primary-900/30">
                <MapPin size={16} className="text-primary-600 dark:text-primary-400" />
              </div>
              Bangui, République Centrafricaine
            </div>
          </div>

          {/* Plateforme */}
          <div>
            <h3 className="mb-6 font-heading text-body-sm font-bold uppercase tracking-widest text-neutral-900 dark:text-neutral-100">
              Plateforme
            </h3>
            <ul className="space-y-4 flex flex-col items-start">
              {FOOTER_LINKS.plateforme.map((link) => (
                <li key={link.href} className="w-full">
                  <Link
                    href={link.href}
                    className="inline-block text-body-sm font-medium text-neutral-500 transition-all hover:translate-x-1 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Entreprise */}
          <div>
            <h3 className="mb-6 font-heading text-body-sm font-bold uppercase tracking-widest text-neutral-900 dark:text-neutral-100">
              Informations & Légal
            </h3>
            <ul className="space-y-4 flex flex-col items-start">
              {FOOTER_LINKS.entreprise.map((link) => (
                <li key={link.href} className="w-full">
                  <Link
                    href={link.href}
                    className="inline-block text-body-sm font-medium text-neutral-500 transition-all hover:translate-x-1 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="mb-6 font-heading text-body-sm font-bold uppercase tracking-widest text-neutral-900 dark:text-neutral-100">
              Contact
            </h3>
            <ul className="space-y-4 flex flex-col items-start">
              {FOOTER_LINKS.contact.map((link) => (
                <li key={link.label} className="w-full">
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 text-body-sm text-neutral-500 transition-all hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400 break-words"
                  >
                    {link.icon && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 group-hover:bg-primary-50 group-hover:text-primary-600 dark:bg-neutral-800/50 dark:group-hover:bg-primary-900/30 dark:group-hover:text-primary-400 transition-colors">
                        <link.icon size={14} className="shrink-0" />
                      </div>
                    )}
                    <span className="font-medium">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            <h3 className="mt-8 mb-4 font-heading text-body-sm font-bold uppercase tracking-widest text-neutral-900 dark:text-neutral-100">
              Suivez-nous
            </h3>
            <div className="flex items-center gap-3">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition-all hover:-translate-y-1 hover:bg-primary-600 hover:text-white hover:shadow-lg hover:shadow-primary-600/30 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-primary-500"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-neutral-200/60 pt-8 dark:border-neutral-800/60 sm:flex-row text-center sm:text-left">
          <p className="text-body-sm font-medium text-neutral-500 dark:text-neutral-400 flex-1">
            &copy; {currentYear} KWATIGUIGUI. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <p className="flex items-center gap-1.5 text-body-sm font-medium text-neutral-500 dark:text-neutral-400">
              Propulsé par <span className="text-primary-600 dark:text-primary-500 font-bold">G.I.R.A Engineering et Consulting</span>
            </p>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showTopBtn && (
        <button
          onClick={goToTop}
          aria-label="Retour en haut"
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary-600 text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-primary-700 hover:shadow-primary-600/30"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </footer>
  );
}
