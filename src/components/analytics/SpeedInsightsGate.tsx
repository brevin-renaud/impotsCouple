"use client";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { usePathname } from "next/navigation";

export function SpeedInsightsGate() {
  const pathname = usePathname();

  // Disable Speed Insights on admin routes only.
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return <SpeedInsights />;
}
