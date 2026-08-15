"use client";

import { useEffect } from "react";
import { sendAnalyticsEvent } from "@/lib/analytics-events";

export default function FunnelViewTracker({
  calculatorId,
  slug,
  segment,
}: {
  calculatorId: string;
  slug: string;
  segment: string;
}) {
  useEffect(() => {
    sendAnalyticsEvent("funnel_view", {
      calculatorId,
      source: slug,
      target: segment,
    });
  }, [calculatorId, segment, slug]);

  return null;
}
