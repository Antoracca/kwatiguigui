"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchableSelect } from "@/components/ui/searchable-select";
import Link from "next/link";
import { useRouter } from "next/navigation";

// --- Options Data ---
const JOB_OPTIONS = [
    { value: "comptabilite", label: "Comptabilité, audit et finance" },
    { value: "administration", label: "Administration et bureaux" },
    { value: "design", label: "Création et design" },
    { value: "batiment", label: "Bâtiment et architecture" },
    { value: "conseil", label: "Conseils et stratégies" },
    { value: "service_client", label: "Services clients et assistance" },
    { value: "ingenierie", label: "Ingénierie et technologie" },
    { value: "agriculture", label: "Agriculture, pêche, foresterie" },
    { value: "restauration", label: "Services et restauration, traiteur" },
    { value: "hotellerie", label: "Hôtellerie et loisirs" },
    { value: "informatique", label: "Informatique, Logiciels et données" },
    { value: "juridique", label: "Services juridiques" },
    { value: "marketing", label: "Marketing et communication" },
    { value: "medical", label: "Médical, Soins de santé" },
    { value: "gestion_projet", label: "Gestion des projets" },
    { value: "immobilier", label: "Agents immobiliers, gestion" },
    { value: "rh", label: "Ressources humaines (RH)" },
    { value: "commercial", label: "Gestion et développement commercial" },
    { value: "social", label: "Services communautaires et sociaux" },
    { value: "vente", label: "Commerce de détail et Vente" },
    { value: "logistique", label: "Chaînes d'approvisionnement et Logistique" },
    { value: "enseignement", label: "Éducation, Recherche et enseignement" },
    { value: "formation", label: "Formation" },
    { value: "transport", label: "Services de transport et Chauffeur" },
    { value: "securite", label: "Santé et sécurité publique" },
    { value: "finance", label: "Banques, finances et assurances" },
    { value: "gouvernement", label: "Gouvernement et Secteur Public" },
    { value: "industrie", label: "Fabrication, Industrie et entreposage" },
    { value: "ong", label: "ONG, OSBL et œuvres de bienfaisance" },
    { value: "tourisme", label: "Tourisme et voyages" },
];

const LOCATIONS_OPTIONS = [
    // Villes
    { value: "bangui", label: "Bangui" },
    { value: "bimbo", label: "Bimbo" },
    { value: "berberati", label: "Berbérati" },
    { value: "bambari", label: "Bambari" },
    { value: "bouar", label: "Bouar" },
    { value: "bossangoa", label: "Bossangoa" },
    { value: "carnot", label: "Carnot" },
    { value: "bria", label: "Bria" },
    { value: "bangassou", label: "Bangassou" },
    { value: "nola", label: "Nola" },
    { value: "kaga-bandoro", label: "Kaga-Bandoro" },
    { value: "boali", label: "Boali" },
    { value: "boda", label: "Boda" },
    // Quartiers (Bangui & Bimbo)
    { value: "sica", label: "Quartier Sica (Bangui)" },
    { value: "lakouanga", label: "Quartier Lakouanga (Bangui)" },
    { value: "boy-rabe", label: "Quartier Boy-Rabe (Bangui)" },
    { value: "pk5", label: "Quartier PK5 (Bangui)" },
    { value: "pk12", label: "Quartier PK12 (Bangui)" },
    { value: "fatima", label: "Quartier Fatima (Bangui)" },
    { value: "gobongo", label: "Quartier Gobongo (Bangui)" },
    { value: "galabadja", label: "Quartier Galabadja (Bangui)" },
    { value: "ouango", label: "Quartier Ouango (Bangui)" },
    { value: "ngaragba", label: "Quartier Ngaragba (Bangui)" },
    { value: "castors", label: "Quartier Castors (Bangui)" },
    { value: "fouh", label: "Quartier Fouh (Bangui)" },
    { value: "miskine", label: "Quartier Miskine (Bangui)" },
    { value: "kassai", label: "Quartier Kassaï (Bangui)" },
    { value: "petevo", label: "Quartier Petévo (Bangui)" },
    { value: "200-villas", label: "200 Villas (Bangui)" },
    { value: "bakongo", label: "Quartier Bakongo (Bangui)" },
    { value: "benz-vi", label: "Quartier Benz-vi (Bangui)" },
    { value: "combattant", label: "Quartier Combattant (Bangui)" },
];

const AnimatedSearchJobIcon = () => (
    <div className="relative flex items-center justify-center w-5 h-5 text-primary-600 dark:text-primary-400">
        <motion.svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute inset-0 w-full h-full"
            animate={{ rotate: [0, 20, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </motion.svg>
        <span className="text-[5px] font-black absolute top-[45%] left-[45%] -translate-x-1/2 -translate-y-1/2 text-neutral-900 dark:text-white">
            JOB
        </span>
    </div>
);

export function QuickSearchForm() {
    const [selectedJob, setSelectedJob] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (selectedJob) params.append("q", selectedJob);
        if (selectedLocation) params.append("location", selectedLocation);
        router.push(`/jobs?${params.toString()}`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.2 }}
            className="mt-16 sm:mt-24 w-full"
        >
            <div className="mx-auto max-w-5xl rounded-[2rem] bg-white p-2 sm:p-3 shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:bg-neutral-900/80 backdrop-blur-md border border-neutral-100 dark:border-neutral-800">
                <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-2">
                    {/* Poste Dropdown */}
                    <div className="flex-1 w-full">
                        <SearchableSelect
                            options={JOB_OPTIONS}
                            value={selectedJob}
                            onChange={setSelectedJob}
                            placeholder="Quel poste recherchez-vous ?"
                            searchPlaceholder="Rechercher un poste ou secteur..."
                            icon={<AnimatedSearchJobIcon />}
                            className="h-14 sm:h-16 border-transparent bg-transparent shadow-none hover:bg-neutral-50 dark:hover:bg-neutral-800/50 rounded-2xl"
                        />
                    </div>
                    
                    <div className="hidden md:block w-px h-8 bg-neutral-200 dark:bg-neutral-700 mx-2" />
                    
                    {/* Location Dropdown */}
                    <div className="flex-1 w-full">
                        <SearchableSelect
                            options={LOCATIONS_OPTIONS}
                            value={selectedLocation}
                            onChange={setSelectedLocation}
                            placeholder="Ville ou quartier..."
                            searchPlaceholder="Rechercher une ville ou un quartier..."
                            icon={<MapPin className="h-5 w-5" />}
                            className="h-14 sm:h-16 border-transparent bg-transparent shadow-none hover:bg-neutral-50 dark:hover:bg-neutral-800/50 rounded-2xl"
                        />
                    </div>
                    
                    {/* Submit Button */}
                    <Button 
                        type="submit" 
                        size="xl" 
                        className="w-full md:w-auto h-14 sm:h-16 px-10 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-bold transition-transform hover:scale-105 shadow-lg shadow-primary-600/20 mt-2 md:mt-0"
                    >
                        Rechercher
                    </Button>
                </form>
            </div>

            {/* Popular searches */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-neutral-500 font-medium">
                <span>Recherches fréquentes :</span>
                <Link href="/jobs?q=transport" className="px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800/40 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors">Chauffeur</Link>
                <Link href="/jobs?q=metiers" className="px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800/40 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors">Aide ménagère</Link>
                <Link href="/jobs?q=comptabilite" className="px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800/40 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors">Comptable</Link>
                <Link href="/jobs?q=batiment" className="px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800/40 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 transition-colors">Maçon</Link>
            </div>
        </motion.div>
    );
}
