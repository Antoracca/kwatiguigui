"use client";

import {
  Building2,
  ChevronDown,
  Compass,
  FileText,
  GraduationCap,
  // Info, // Removed
  LogIn,
  Menu,
  Moon,
  // Newspaper, // Removed
  Sun,
  UserPlus,
  Users,
  X,
  ArrowRight,
  Target,
  FileBadge,
  User,
  Hammer,
  Laptop,
  CreditCard,
  Medal,
  Megaphone,
  Briefcase,
  HelpCircle,
  FileSearch,
  Handshake,
  MessageSquare,
  Search,
  Newspaper,
  Store,
  Truck,
  Wrench,
  Lightbulb
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { useAuthContext } from "@/components/providers/auth-provider";

// --- MEGA MENU DATA (Indeed Inspired) ---
const NAV_CATEGORIES = [
  {
    id: "candidats",
    label: "Demandeurs d'emploi",
    href: "/jobs",
    highlight: {
      title: "Votre prochain emploi vous attend",
      description: "Découvrez des milliers d'offres adaptées à votre profil, du secteur formel à l'informel.",
      action: "Rechercher un emploi",
      href: "/jobs",
      icon: Search,
      color: "from-primary-500/20 to-primary-600/5",
    },
    links: [
      { href: "/demandeurs-emploi/emplois-formels", label: "Emplois Formels", icon: Building2, description: "CDI, CDD, Secteur Privé & Public" },
      { href: "/demandeurs-emploi/missions-informel", label: "Missions & Informel", icon: Hammer, description: "Journalier, missions courtes, artisanat" },
      { href: "/demandeurs-emploi/freelance-independants", label: "Freelance & Indépendants", icon: Laptop, description: "Missions pour les experts" },
      { href: "/demandeurs-emploi/creer-cv", label: "Créer un CV", icon: FileText, description: "Mettez en valeur vos compétences" },
      { href: "/demandeurs-emploi/guide-salaires", label: "Guide des salaires", icon: FileBadge, description: "Découvrez les rémunérations par secteur" },
      { href: "/demandeurs-emploi/stages-alternances", label: "Stages & Alternances", icon: GraduationCap, description: "Pour les étudiants et jeunes diplômés" },
    ]
  },
  {
    id: "entreprises",
    label: "Entreprises",
    href: "/entreprises",
    highlight: {
      title: "Trouvez les bons candidats, rapidement",
      description: "Des outils puissants pour sourcer, évaluer et recruter les talents de demain en RCA.",
      action: "Publier une offre",
      href: "/jobs/create",
      icon: UserPlus,
      color: "from-secondary-500/20 to-secondary-600/5",
    },
    links: [
      { href: "/entreprises/cvtheque-africaine", label: "CVthèque Africaine", icon: FileSearch, description: "Trouvez les meilleurs profils en RCA" },
      { href: "/entreprises/tarifs-solutions", label: "Tarifs & Solutions", icon: CreditCard, description: "Boostez la visibilité de vos recrutements" },
      { href: "/entreprises/marque-employeur", label: "Marque Employeur", icon: Medal, description: "Attirez les talents avec votre page" },
      { href: "/entreprises/gestion-offres", label: "Gérer vos offres", icon: Megaphone, description: "Suivez vos candidatures en temps réel" },
    ]
  },
  {
    id: "partenariats",
    label: "Partenariats",
    href: "/partenariats",
    badge: "Nouveau",
    highlight: {
      title: "Construisons ensemble",
      description: "Devenez partenaire pour accueillir des stagiaires, proposer vos services ou développer votre réseau.",
      action: "Devenir Partenaire",
      href: "/partenariats/rejoindre",
      icon: Handshake,
      color: "from-amber-500/20 to-amber-600/5",
    },
    links: [
      { href: "/partenariats/pme-agences", label: "PME & Agences", icon: Lightbulb, description: "Programmes de stage et collaborations." },
      { href: "/partenariats/sous-traitance", label: "Sous-traitance & Prestations", icon: Wrench, description: "Proposez votre expertise BTP ou Tech." },
      { href: "/partenariats/vendeurs", label: "Vendeurs & Commerçants", icon: Store, description: "Intégrez notre réseau de fournisseurs." },
      { href: "/partenariats/logistique", label: "Flotte & Logistique", icon: Truck, description: "Partenariats pour le transport et matériel." },
    ]
  },
  {
    id: "decouvrir",
    label: "Découvrir",
    href: "/about",
    highlight: {
      title: "À propos de KWATIGUIGUI",
      description: "Notre mission : dynamiser le marché de l'emploi en République Centrafricaine.",
      action: "Notre histoire",
      href: "/about",
      icon: Compass,
      color: "from-accent-500/20 to-accent-600/5",
    },
    links: [
      { href: "/blog", label: "Actualités & Conseils", icon: Newspaper, description: "Articles sur l'emploi et le BTP" },
      { href: "/about/equipe", label: "Notre Équipe", icon: Users, description: "Les visages derrière la plateforme" },
      { href: "/faq", label: "Centre d'aide & FAQ", icon: HelpCircle, description: "Toutes les réponses à vos questions" },
      { href: "/contact", label: "Nous contacter", icon: MessageSquare, description: "Une équipe à votre écoute" },
    ]
  }
];

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { user, isLoading: authLoading } = useAuthContext();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [profileAvatar, setProfileAvatar] = React.useState<string | null>(null);

  const supabase = createClient();

  const handleSignOut = async () => {
    setUserMenuOpen(false);
    setMobileOpen(false);
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  // Fetch user profile for avatar
  React.useEffect(() => {
    async function fetchProfile() {
      if (!user) return;
      try {
        const { data } = await supabase
          .from("profiles")
          .select("avatar_url")
          .eq("id", user.id)
          .single();
        if (data?.avatar_url) {
          setProfileAvatar(data.avatar_url);
        }
      } catch (error) {
        console.error("Failed to load profile avatar", error);
      }
    }
    fetchProfile();
  }, [user, supabase]);

  // Mega Menu State
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);
  const menuTimeoutRef = React.useRef<NodeJS.Timeout>(undefined);

  // User dropdown state
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);

  // Close user menu on outside click
  React.useEffect(() => {
    if (!userMenuOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest("[data-user-menu]")) setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [userMenuOpen]);

  // Track scroll for sticky header effect
  React.useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  React.useEffect(() => {
    setMobileOpen(false);
    setActiveMenu(null);
  }, [pathname]);

  const handleMouseEnter = (id: string) => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setActiveMenu(id);
  };

  const handleMouseLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150); // Small delay to prevent accidental closures
  };

  const activeCategory = NAV_CATEGORIES.find(c => c.id === activeMenu);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled || activeMenu || mobileOpen
          ? "bg-white/95 backdrop-blur-xl border-b border-neutral-200/50 shadow-sm dark:bg-neutral-950/95 dark:border-white/[0.05]"
          : "bg-white dark:bg-neutral-950 border-b border-transparent",
      )}
      onMouseLeave={handleMouseLeave}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 lg:gap-8 px-4 sm:px-6 lg:px-8 relative z-20">

        {/* LOGO AREA */}
        <Link
          href="/"
          className="flex flex-shrink-0 items-center transition-transform hover:opacity-90 active:scale-95"
          onClick={() => setActiveMenu(null)}
        >
          {/* Logo container, responsive sizing maintaining aspect ratio */}
          <div className="relative h-12 w-[160px] sm:h-14 sm:w-[200px] lg:h-16 lg:w-[240px]">
            <Image
              src="/images/logoprincipal.png"
              alt="KWATIGUIGUI"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Desktop navigation — visible à partir de lg (1024px) */}
        <nav className="hidden lg:flex flex-1 items-center justify-center gap-1 xl:gap-2 h-full" role="navigation">
          {NAV_CATEGORIES.map((category) => {
            const isActiveRoute = pathname === category.href || pathname.startsWith(category.href + "/");
            const isHovered = activeMenu === category.id;

            return (
              <div
                key={category.id}
                className="h-full flex items-center px-1"
                onMouseEnter={() => handleMouseEnter(category.id)}
              >
                <Link
                  href={category.href}
                  className={cn(
                    "group flex items-center gap-1.5 rounded-full px-3 lg:px-4 py-2 text-sm lg:text-body-md font-semibold transition-all duration-200 whitespace-nowrap",
                    isActiveRoute ? "text-primary-600 dark:text-primary-400" : "text-neutral-700 dark:text-neutral-300",
                    isHovered ? "bg-primary-50 dark:bg-primary-950/50 text-primary-700 dark:text-primary-300" : "hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                  )}
                >
                  {category.label}
                  {/* Optional Badge */}
                  {category.badge && (
                    <span className="ml-1.5 inline-flex items-center rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold tracking-wide text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 uppercase animate-pulse">
                      {category.badge}
                    </span>
                  )}
                  <ChevronDown
                    size={16}
                    className={cn(
                      "transition-transform duration-300 text-neutral-400 group-hover:text-primary-500",
                      isHovered ? "rotate-180 text-primary-600" : ""
                    )}
                  />
                </Link>
              </div>
            );
          })}
        </nav>

        {/* Desktop actions — visible à partir de lg (1024px) */}
        <div className="hidden lg:flex flex-shrink-0 items-center justify-end gap-2 lg:gap-3">

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full p-2 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
            aria-label="Changer le theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>

          <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-800 hidden lg:block mx-1" />

          {/* Auth / User area */}
          {authLoading ? (
            <div className="h-9 w-28 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-800" />
          ) : user ? (
            <div className="relative" data-user-menu>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-1.5 py-1.5 pr-4 text-neutral-700 dark:text-neutral-300 font-semibold text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all shadow-sm"
              >
                <div className="relative h-8 w-8 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0 border border-neutral-100 dark:border-neutral-700">
                  {profileAvatar ? (
                    <Image
                      src={profileAvatar}
                      alt="Avatar"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <User className="h-4 w-4 text-neutral-500" />
                  )}
                </div>
                Mon espace
                <ChevronDown size={14} className={cn("ml-1 text-neutral-400 transition-transform duration-200", userMenuOpen ? "rotate-180 text-primary-500" : "")} />
              </button>
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-xl z-50 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-neutral-100 dark:border-neutral-800">
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">Connecté en tant que</p>
                      <p className="text-sm font-semibold text-neutral-900 dark:text-white truncate">{user.email}</p>
                    </div>
                    <div className="py-1">
                      {[
                        { href: "/dashboard", icon: Target, label: "Tableau de bord" },
                        { href: "/dashboard/profile", icon: User, label: "Mon profil" },
                        { href: "/dashboard/jobs", icon: Briefcase, label: "Mes annonces" },
                        { href: "/dashboard/messages", icon: MessageSquare, label: "Messages" },
                      ].map(item => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        >
                          <item.icon size={16} className="text-neutral-400 shrink-0" />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-neutral-100 dark:border-neutral-800 py-1">
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                      >
                        <LogIn size={16} className="rotate-180 shrink-0" />
                        Déconnexion
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Button asChild variant="ghost" className="hidden lg:flex font-semibold px-4 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-primary-700 dark:text-primary-400">
                <Link href="/login">
                  <User size={18} className="mr-2" />
                  Connexion
                </Link>
              </Button>
              <Button asChild className="bg-primary-600 hover:bg-primary-700 text-white dark:bg-primary-500 dark:hover:bg-primary-600 rounded-lg px-5 font-semibold transition-all shadow-sm flex items-center gap-2">
                <Link href="/register">
                  <UserPlus size={18} />
                  S'inscrire
                </Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile/tablet hamburger — visible en dessous de lg (1024px) */}
        <button
          className="relative z-50 rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 lg:hidden dark:text-neutral-300 dark:hover:bg-neutral-800 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* --- MEGA MENU DROPDOWN (DESKTOP) --- */}
      <AnimatePresence>
        {activeCategory && !mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5, transition: { duration: 0.15 } }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute left-0 w-full overflow-hidden bg-white dark:bg-neutral-950 border-b border-t border-neutral-200/50 dark:border-neutral-800/50 shadow-xl origin-top z-10"
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-12 gap-8 py-8">

                {/* Highlight Section (Left 4 cols) */}
                <div className="col-span-4 relative overflow-hidden rounded-xl bg-neutral-50 dark:bg-neutral-900/50 p-6 border border-neutral-100 dark:border-neutral-800/50 group">
                  <div className={cn("absolute inset-0 bg-gradient-to-br opacity-40 dark:opacity-10", activeCategory.highlight.color)} />
                  <div className="relative z-10 flex flex-col h-full items-start">
                    <div className="mb-4 inline-flex p-3 rounded-lg bg-white dark:bg-neutral-800 shadow-sm border border-neutral-100 dark:border-neutral-700">
                      <activeCategory.highlight.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <h3 className="text-heading-sm font-bold font-heading text-neutral-900 dark:text-white mb-2">
                      {activeCategory.highlight.title}
                    </h3>
                    <p className="text-body-sm text-neutral-600 dark:text-neutral-400 mb-6">
                      {activeCategory.highlight.description}
                    </p>
                    <Button asChild className="mt-auto rounded-lg gap-2 shadow-sm group/btn bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 font-semibold">
                      <Link href={activeCategory.highlight.href}>
                        {activeCategory.highlight.action}
                        <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Links Section (Right 8 cols) */}
                <div className="col-span-8 py-2 pl-4 border-l border-neutral-100 dark:border-neutral-800">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                    {activeCategory.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setActiveMenu(null)}
                        className="group flex items-start gap-3 rounded-lg p-2 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
                      >
                        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-500 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/40 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          <link.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-neutral-900 dark:text-white group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
                            {link.label}
                          </div>
                          <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 leading-relaxed">
                            {link.description}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- MOBILE MENU --- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 top-[72px] z-40 bg-white dark:bg-neutral-950 overflow-y-auto pb-24 lg:hidden"
          >
            <div className="px-5 py-6 flex flex-col gap-8">

              {/* Mobile Auth Actions */}
              <div className="flex flex-col gap-3">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-primary-50 dark:bg-primary-950/40 border border-primary-200 dark:border-primary-800/50">
                      <div className="h-10 w-10 rounded-full bg-primary-600 dark:bg-primary-500 flex items-center justify-center text-white font-bold shrink-0">
                        {user.email?.[0]?.toUpperCase() ?? "U"}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">Connecté</p>
                        <p className="text-sm font-semibold text-neutral-900 dark:text-white truncate">{user.email}</p>
                      </div>
                    </div>
                    {[
                      { href: "/dashboard", icon: Target, label: "Tableau de bord" },
                      { href: "/dashboard/profile", icon: User, label: "Mon profil" },
                      { href: "/dashboard/jobs", icon: Briefcase, label: "Mes annonces" },
                      { href: "/dashboard/messages", icon: MessageSquare, label: "Messages" },
                    ].map(item => (
                      <Button key={item.href} asChild variant="outline" className="w-full justify-start gap-3 text-body-md py-5 rounded-xl border-neutral-200 dark:border-neutral-800">
                        <Link href={item.href} onClick={() => setMobileOpen(false)}>
                          <item.icon className="h-5 w-5 text-neutral-500" />
                          {item.label}
                        </Link>
                      </Button>
                    ))}
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl border border-red-200 dark:border-red-900/50 transition-colors"
                    >
                      <LogIn className="h-5 w-5 rotate-180" />
                      Déconnexion
                    </button>
                  </>
                ) : (
                  <>
                    <Button asChild className="w-full text-body-md py-6 rounded-xl bg-primary-600 text-white font-semibold">
                      <Link href="/register" onClick={() => setMobileOpen(false)}>
                        <UserPlus className="mr-2 h-5 w-5" />
                        Créer un compte gratuit
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full text-body-md py-6 rounded-xl border-neutral-200 dark:border-neutral-800 font-semibold text-neutral-700 dark:text-neutral-300">
                      <Link href="/login" onClick={() => setMobileOpen(false)}>
                        <LogIn className="mr-2 h-5 w-5" />
                        Se connecter
                      </Link>
                    </Button>
                  </>
                )}
              </div>

              {/* Mobile Categories */}
              <div className="flex flex-col gap-6">
                {NAV_CATEGORIES.map((category, idx) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + (idx * 0.05) }}
                    className="flex flex-col gap-3"
                  >
                    <h2 className="text-heading-sm font-bold text-neutral-900 dark:text-white border-b border-neutral-100 dark:border-neutral-800 pb-2 flex items-center justify-between">
                      {category.label}
                      {category.badge && (
                        <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold tracking-wide text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 uppercase">
                          {category.badge}
                        </span>
                      )}
                    </h2>
                    <div className="grid grid-cols-1 gap-2 pt-2">
                      {category.links.map(link => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="flex items-center gap-4 text-body-lg font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 p-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                            <link.icon className="w-4 h-4" />
                          </div>
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Mobile Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 border-t border-neutral-100 pt-6 dark:border-neutral-800 flex items-center justify-between"
              >
                <span className="text-body-sm font-medium text-neutral-500">Mode d'affichage</span>
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="flex items-center gap-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 px-4 py-2.5 text-body-sm font-medium text-neutral-900 dark:text-white"
                >
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                  {theme === "dark" ? "Passer au clair" : "Passer au sombre"}
                </button>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}






