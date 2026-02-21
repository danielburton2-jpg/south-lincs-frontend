"use client";

import { useSearchParams } from "next/navigation";

export default function VersionFooter() {
  const sp = useSearchParams();
  const desktopVersion = sp.get("desktopVersion");

  const webVersion = process.env.NEXT_PUBLIC_APP_VERSION || "dev";

  return (
    <div className="mt-8 text-center text-xs text-white/50">
      Web: {webVersion}
      {desktopVersion ? ` • Desktop: ${desktopVersion}` : ""}
    </div>
  );
}