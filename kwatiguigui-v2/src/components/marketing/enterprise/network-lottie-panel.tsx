"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

type NetworkLottiePanelProps = {
  remoteSrc: string;
  fallbackSrc?: string;
  badge?: string;
  className?: string;
  glowClassName?: string;
};

type JsonLike = Record<string, unknown>;

export function NetworkLottiePanel({
  remoteSrc,
  fallbackSrc = "/images/entreprisesearch.lottie",
  badge = "Animation interactive",
  className,
  glowClassName,
}: NetworkLottiePanelProps) {
  const [animationData, setAnimationData] = useState<JsonLike | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setFailed(false);
    setAnimationData(null);

    fetch(remoteSrc, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((json: JsonLike) => setAnimationData(json))
      .catch(() => {
        if (!controller.signal.aborted) setFailed(true);
      });

    return () => controller.abort();
  }, [remoteSrc]);

  const content = useMemo(() => {
    if (animationData) {
      return <Lottie animationData={animationData} loop className="h-full w-full" />;
    }

    if (failed) {
      return <DotLottieReact src={fallbackSrc} loop autoplay className="h-full w-full" />;
    }

    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-neutral-300 border-t-primary-600 dark:border-neutral-700 dark:border-t-primary-400" />
      </div>
    );
  }, [animationData, failed, fallbackSrc]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative mx-auto w-full max-w-[520px] overflow-hidden rounded-[2rem] border border-white/40 bg-white/70 p-4 shadow-2xl backdrop-blur-xl dark:border-neutral-700/70 dark:bg-neutral-900/70",
        className,
      )}
    >
      <div className={cn("pointer-events-none absolute -left-14 -top-14 h-44 w-44 rounded-full bg-primary-500/20 blur-3xl", glowClassName)} />
      <div className="pointer-events-none absolute -bottom-14 -right-14 h-44 w-44 rounded-full bg-secondary-500/20 blur-3xl" />

      <div className="relative mb-3 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/90 px-3 py-1 text-xs font-semibold text-neutral-700 shadow-sm dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-neutral-200">
        <Sparkles className="h-3.5 w-3.5 text-primary-600 dark:text-primary-400" />
        {badge}
      </div>

      <div className="relative h-[320px] overflow-hidden rounded-[1.25rem] border border-neutral-200/80 bg-gradient-to-br from-neutral-100 via-white to-neutral-50 p-3 dark:border-neutral-700 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900">
        {content}
      </div>
    </motion.div>
  );
}
