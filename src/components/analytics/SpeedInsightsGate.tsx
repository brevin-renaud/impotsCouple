"use client";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { usePathname } from "next/navigation";
import { useRef } from "react";

export function SpeedInsightsGate() {
  const pathname = usePathname();
  const isSampledInRef = useRef(Math.random() < 0.5);

  // TODO: réactiver quand quota Vercel Insights rechargé
  return null;

  if (pathname?.startsWith("/admin")) return null; // eslint-disable-line no-unreachable
  if (!isSampledInRef.current) return null; // eslint-disable-line no-unreachable
  return <SpeedInsights />; // eslint-disable-line no-unreachable
}
