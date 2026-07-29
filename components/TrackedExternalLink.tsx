"use client";

import { sendAnalyticsEvent, type AnalyticsEventName } from "@/lib/analytics-events";

type TrackedExternalLinkProps = {
  href: string;
  event: AnalyticsEventName;
  source?: string;
  target?: string;
  className?: string;
  children: React.ReactNode;
};

export default function TrackedExternalLink({
  href,
  event,
  source,
  target,
  className,
  children,
}: TrackedExternalLinkProps) {
  return (
    <a
      href={href}
      className={className}
      rel="noreferrer"
      target="_blank"
      onClick={() => sendAnalyticsEvent(event, { source, target: target ?? href })}
    >
      {children}
    </a>
  );
}
