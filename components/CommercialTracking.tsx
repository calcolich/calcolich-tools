"use client";

import Link from "next/link";
import { useEffect } from "react";

type CommercialEventName = "commercial_page_view" | "commercial_cta_click";

type TrackedLinkProps = {
  href: string;
  source: string;
  className?: string;
  children: React.ReactNode;
};

export function CommercialPageView({ source }: { source: string }) {
  useEffect(() => {
    sendCommercialEvent("commercial_page_view", source);
  }, [source]);

  return null;
}

export function TrackedLink({ href, source, className, children }: TrackedLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => sendCommercialEvent("commercial_cta_click", source, href)}
    >
      {children}
    </Link>
  );
}

function sendCommercialEvent(event: CommercialEventName, source: string, target?: string) {
  const body = JSON.stringify({
    event,
    source,
    page: window.location.pathname,
    target,
  });

  if (navigator.sendBeacon) {
    const sent = navigator.sendBeacon(
      "/api/events",
      new Blob([body], { type: "application/json" }),
    );
    if (sent) return;
  }

  void fetch("/api/events", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
    keepalive: true,
  });
}
