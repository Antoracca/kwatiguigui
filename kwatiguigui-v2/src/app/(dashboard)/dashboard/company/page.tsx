import { Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Marque Employeur",
};

export default function CompanyPage() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h1 className="font-heading text-heading-xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center gap-3">
                    <Building2 className="text-primary-500" />
                    Page Entreprise & Marque
                </h1>
                <p className="text-body-sm text-neutral-500 mt-2">
                    Présentez vos valeurs, votre équipe et votre cadre de travail.
                </p>
            </div>

            <div className="flex flex-col items-center justify-center rounded-2xl border border-primary-200 bg-primary-50/50 p-10 dark:border-primary-900/50 dark:bg-primary-950/20 text-center">
                <Building2 size={48} className="text-primary-400 mb-6" />
                <h2 className="text-heading-md font-bold text-primary-900 dark:text-primary-100 mb-3">Une page dédiée pour attirer les meilleurs</h2>
                <p className="text-body-sm text-neutral-600 dark:text-neutral-400 mb-8 max-w-lg">
                    La fonctionnalité "Marque Employeur" vous permettra de créer une véritable vitrine pour votre entreprise : photos de bureaux, témoignages employés, et offres groupées.
                </p>
                <Button size="lg" variant="primary">Créer ma page vitrine (Bientôt)</Button>
            </div>
        </div>
    );
}
