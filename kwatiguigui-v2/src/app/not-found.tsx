import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="font-heading text-display-2xl font-bold text-primary-100 dark:text-primary-900">
        404
      </p>
      <h1 className="-mt-4 text-heading-xl font-heading text-neutral-900 dark:text-neutral-100">
        Page introuvable
      </h1>
      <p className="mt-4 max-w-md text-body-md text-neutral-500">
        La page que vous recherchez n'existe pas ou a ete deplacee.
      </p>
      <div className="mt-8 flex gap-4">
        <Link href="/">
          <Button variant="primary" size="md">
            <Home size={18} />
            Accueil
          </Button>
        </Link>
        <Link href="/jobs">
          <Button variant="outline" size="md">
            <ArrowLeft size={18} />
            Offres d'emploi
          </Button>
        </Link>
      </div>
    </div>
  );
}
