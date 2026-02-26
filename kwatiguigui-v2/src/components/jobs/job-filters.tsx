"use client";

import { Filter, RotateCcw, X } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RCA_REGIONS, JOB_TYPES } from "@/lib/constants";

// ---------------------------------------------------------------------------
// Active filter pills
// ---------------------------------------------------------------------------
interface ActiveFilter {
  key: string;
  label: string;
  value: string;
}

// ---------------------------------------------------------------------------
// JobFilters component
// ---------------------------------------------------------------------------
export function JobFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentRegion = searchParams.get("region") ?? "";
  const currentJobType = searchParams.get("job_type") ?? "";
  const currentUserType = searchParams.get("user_type") ?? "";
  const currentSort = searchParams.get("sort") ?? "recent";

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page"); // Reset to page 1 on filter change
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function clearAll() {
    router.push(pathname, { scroll: false });
  }

  const activeFilters: ActiveFilter[] = [
    ...(currentRegion ? [{ key: "region", label: "Region", value: currentRegion }] : []),
    ...(currentJobType ? [{ key: "job_type", label: "Metier", value: currentJobType }] : []),
    ...(currentUserType
      ? [
          {
            key: "user_type",
            label: "Type",
            value: currentUserType === "seeker" ? "Chercheur" : "Employeur",
          },
        ]
      : []),
  ];

  return (
    <div className="space-y-4">
      {/* Filter header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-neutral-500" />
          <span className="text-body-sm font-semibold text-neutral-700 dark:text-neutral-300">
            Filtres
          </span>
          {activeFilters.length > 0 && (
            <Badge variant="primary" className="text-body-xs">
              {activeFilters.length}
            </Badge>
          )}
        </div>
        {activeFilters.length > 0 && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 text-body-xs text-neutral-400 transition-colors hover:text-error-500"
          >
            <RotateCcw size={12} />
            Tout effacer
          </button>
        )}
      </div>

      {/* Type d'utilisateur */}
      <div className="space-y-2">
        <p className="text-body-xs font-medium uppercase tracking-wider text-neutral-400">
          Profil
        </p>
        <div className="flex gap-2">
          {[
            { value: "", label: "Tous" },
            { value: "seeker", label: "Chercheurs" },
            { value: "employer", label: "Employeurs" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateParam("user_type", opt.value)}
              className={`rounded-full px-3 py-1.5 text-body-xs font-medium transition-all ${
                currentUserType === opt.value
                  ? "bg-primary-500 text-white shadow-sm"
                  : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Region */}
      <div className="space-y-2">
        <p className="text-body-xs font-medium uppercase tracking-wider text-neutral-400">
          Region
        </p>
        <Select
          value={currentRegion}
          onValueChange={(val) => updateParam("region", val === "all" ? "" : val)}
        >
          <SelectTrigger className="h-9 text-body-sm">
            <SelectValue placeholder="Toutes les regions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les regions</SelectItem>
            {RCA_REGIONS.map((region) => (
              <SelectItem key={region} value={region}>
                {region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Type d'emploi */}
      <div className="space-y-2">
        <p className="text-body-xs font-medium uppercase tracking-wider text-neutral-400">
          Metier
        </p>
        <Select
          value={currentJobType}
          onValueChange={(val) => updateParam("job_type", val === "all" ? "" : val)}
        >
          <SelectTrigger className="h-9 text-body-sm">
            <SelectValue placeholder="Tous les metiers" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les metiers</SelectItem>
            {JOB_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tri */}
      <div className="space-y-2">
        <p className="text-body-xs font-medium uppercase tracking-wider text-neutral-400">
          Trier par
        </p>
        <Select
          value={currentSort}
          onValueChange={(val) => updateParam("sort", val)}
        >
          <SelectTrigger className="h-9 text-body-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Plus recents</SelectItem>
            <SelectItem value="oldest">Plus anciens</SelectItem>
            <SelectItem value="expiry">Expiration proche</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Active filter pills */}
      {activeFilters.length > 0 && (
        <div className="space-y-2 border-t border-neutral-100 pt-3 dark:border-neutral-800">
          <p className="text-body-xs font-medium uppercase tracking-wider text-neutral-400">
            Filtres actifs
          </p>
          <div className="flex flex-wrap gap-2">
            {activeFilters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => updateParam(filter.key, "")}
                className="flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-body-xs font-medium text-primary-600 transition-colors hover:bg-error-50 hover:text-error-600 dark:bg-primary-950 dark:text-primary-400"
              >
                {filter.value}
                <X size={12} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
