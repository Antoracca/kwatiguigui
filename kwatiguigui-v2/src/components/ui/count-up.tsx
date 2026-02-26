"use client";

import { animate, useInView } from "framer-motion";
import * as React from "react";

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

/**
 * Animated number counter that triggers when scrolled into view.
 * Uses Framer Motion animate() for smooth 60fps counting.
 */
export function CountUp({
  end,
  duration = 2,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: CountUpProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hasAnimated, setHasAnimated] = React.useState(false);

  React.useEffect(() => {
    if (!isInView || hasAnimated || !ref.current) return;
    setHasAnimated(true);

    const element = ref.current;
    const controls = animate(0, end, {
      duration,
      ease: "easeOut",
      onUpdate(value) {
        element.textContent =
          prefix +
          value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, " ") +
          suffix;
      },
    });

    return () => controls.stop();
  }, [isInView, hasAnimated, end, duration, prefix, suffix, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
