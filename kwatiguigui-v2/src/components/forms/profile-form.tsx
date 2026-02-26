"use client";

import { useActionState, useEffect } from "react";
import { Save, CheckCircle, AlertCircle } from "lucide-react";

import { updateProfile } from "@/lib/actions/profile";
import { RCA_REGIONS, JOB_TYPES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileFormProps {
  initialValues: {
    first_name: string;
    age: number;
    phone: string;
    region: string;
    city: string;
    neighborhood: string;
    job_type: string;
    experience: string;
    whatsapp: string;
  };
}

const initialState = { success: false };

export function ProfileForm({ initialValues }: ProfileFormProps) {
  const [state, action, isPending] = useActionState(updateProfile, initialState);

  return (
    <form action={action} className="space-y-6">
      {/* Success / Error alerts */}
      {state.success && (
        <div
          role="alert"
          className="flex items-center gap-3 rounded-xl border border-secondary-200 bg-secondary-50 p-4 text-secondary-800 dark:border-secondary-800 dark:bg-secondary-950/30 dark:text-secondary-300"
        >
          <CheckCircle className="h-5 w-5 shrink-0 text-secondary-500" />
          <p className="text-fluid-sm font-medium">Profil mis a jour avec succes.</p>
        </div>
      )}

      {state.error && (
        <div
          role="alert"
          className="flex items-center gap-3 rounded-xl border border-error-200 bg-error-50 p-4 text-error-800 dark:border-error-800 dark:bg-error-950/30 dark:text-error-300"
        >
          <AlertCircle className="h-5 w-5 shrink-0 text-error-500" />
          <p className="text-fluid-sm">{state.error}</p>
        </div>
      )}

      {/* Informations personnelles */}
      <Card>
        <CardHeader>
          <CardTitle className="text-fluid-lg">Informations personnelles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              name="first_name"
              label="Prenom"
              defaultValue={initialValues.first_name}
              placeholder="Votre prenom"
              error={state.fieldErrors?.first_name?.[0]}
              required
            />
            <Input
              name="age"
              label="Age"
              type="number"
              defaultValue={String(initialValues.age)}
              placeholder="25"
              min={18}
              max={99}
              error={state.fieldErrors?.age?.[0]}
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              name="whatsapp_display"
              label="Numero WhatsApp"
              type="tel"
              defaultValue={initialValues.whatsapp}
              readOnly
              disabled
              helperText="Non modifiable — utilisez ce numero pour vous identifier"
              className="cursor-not-allowed opacity-60"
            />
            <Input
              name="phone"
              label="Telephone secondaire"
              type="tel"
              defaultValue={initialValues.phone}
              placeholder="+236 XX XX XX XX (optionnel)"
              error={state.fieldErrors?.phone?.[0]}
            />
          </div>
        </CardContent>
      </Card>

      {/* Localisation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-fluid-lg">Localisation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select name="region" defaultValue={initialValues.region}>
            <SelectTrigger
              label="Region"
              error={state.fieldErrors?.region?.[0]}
            >
              <SelectValue placeholder="Selectionner une region" />
            </SelectTrigger>
            <SelectContent>
              {RCA_REGIONS.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              name="city"
              label="Ville"
              defaultValue={initialValues.city}
              placeholder="Votre ville"
              error={state.fieldErrors?.city?.[0]}
              required
            />
            <Input
              name="neighborhood"
              label="Quartier"
              defaultValue={initialValues.neighborhood}
              placeholder="Votre quartier (optionnel)"
              error={state.fieldErrors?.neighborhood?.[0]}
            />
          </div>
        </CardContent>
      </Card>

      {/* Profil professionnel */}
      <Card>
        <CardHeader>
          <CardTitle className="text-fluid-lg">Profil professionnel</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select name="job_type" defaultValue={initialValues.job_type}>
            <SelectTrigger
              label="Type d'emploi"
              error={state.fieldErrors?.job_type?.[0]}
            >
              <SelectValue placeholder="Selectionner un type d'emploi" />
            </SelectTrigger>
            <SelectContent>
              {JOB_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Textarea
            name="experience"
            label="Experience / Motivation"
            defaultValue={initialValues.experience}
            placeholder="Decrivez votre experience professionnelle ou votre motivation (optionnel)"
            rows={4}
            maxLength={500}
            showCount
            error={state.fieldErrors?.experience?.[0]}
          />
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="flex justify-end">
        <Button
          type="submit"
          variant="primary"
          size="md"
          loading={isPending}
          className="min-w-[160px]"
        >
          <Save className="h-4 w-4" />
          Enregistrer
        </Button>
      </div>
    </form>
  );
}
