import type { Metadata } from "next";
import { HelpCircle, MessageCircle, Phone, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FAQ_ITEMS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Centre d'aide",
  description:
    "Besoin d'aide avec KWATIGUIGUI ? Trouvez des reponses a vos questions ou contactez notre support.",
  alternates: { canonical: "/help" },
};

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-heading-xl font-heading text-neutral-900 dark:text-neutral-100">
          Centre d'aide
        </h1>
        <p className="mt-2 text-body-md text-neutral-500">
          Comment pouvons-nous vous aider ?
        </p>
      </div>

      {/* Search */}
      <div className="mb-12 mx-auto max-w-lg">
        <Input
          placeholder="Rechercher dans l'aide..."
          leftIcon={<Search size={18} />}
        />
      </div>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="mb-6 text-heading-lg font-heading text-neutral-900 dark:text-neutral-100">
          Questions frequentes
        </h2>
        <div className="space-y-4">
          {FAQ_ITEMS.map((faq) => (
            <Card key={faq.question}>
              <CardContent className="pt-6">
                <h3 className="flex items-start gap-3 font-heading text-heading-sm text-neutral-900 dark:text-neutral-100">
                  <HelpCircle size={20} className="mt-0.5 shrink-0 text-primary-500" />
                  {faq.question}
                </h3>
                <p className="mt-2 pl-8 text-body-sm text-neutral-500">
                  {faq.answer}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contact support */}
      <Card featured className="p-8 text-center">
        <h2 className="text-heading-md font-heading text-neutral-900 dark:text-neutral-100">
          Vous n'avez pas trouve votre reponse ?
        </h2>
        <p className="mt-2 text-body-md text-neutral-500">
          Contactez notre equipe de support directement.
        </p>
        <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a href="https://wa.me/23674143434" target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="md">
              <MessageCircle size={18} />
              WhatsApp
            </Button>
          </a>
          <a href="tel:+23674143434">
            <Button variant="outline" size="md">
              <Phone size={18} />
              +236 74 14 34 34
            </Button>
          </a>
        </div>
      </Card>
    </div>
  );
}
