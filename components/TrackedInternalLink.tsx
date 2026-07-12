"use client";

import Link from "next/link";
import { sendAnalyticsEvent, type AnalyticsEventName } from "@/lib/analytics-events";

export default function TrackedInternalLink({
  href,
  event,
  source,
  target,
  className,
  hrefLang,
  children,
}: {
  href: string;
  event: AnalyticsEventName;
  source?: string;
  target?: string;
  className?: string;
  hrefLang?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      hrefLang={hrefLang}
      className={className}
      onClick={() => sendAnalyticsEvent(event, { source, target: target ?? href })}
    >
      {children}
    </Link>
  );
}
