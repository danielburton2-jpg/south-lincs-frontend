"use client";

import { useSearchParams } from "next/navigation";
import { APP_VERSION } from "@/app/version";

export default function VersionFooter() {
  const sp = useSearchParams();
  const desktopVersion = sp.get("desktopVersion");

  return (
    <div className="mt-8 text-center text-xs text-white/50">
      Web: {APP_VERSION}
      {desktopVersion ? ` • Desktop: ${desktopVersion}` : ""}
    </div>
  );
}