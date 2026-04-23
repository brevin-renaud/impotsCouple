"use client";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { usePathname } from "next/navigation";
import { useRef } from "react";

export function SpeedInsightsGate() {
  const pathname = usePathname();
  const isSampledInRef = useRef(Math.random() < 0.5);

  // Disable Speed Insights on admin routes only.
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  // Reduce quota usage by sending Speed Insights events for ~50% of visits.
  if (!isSampledInRef.current) {
    return null;
  }

  return <SpeedInsights />;
}
