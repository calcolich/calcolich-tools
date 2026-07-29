"use client";

import { useEffect } from "react";
import { sendAnalyticsEvent } from "@/lib/analytics-events";

export default function GuideViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    sendAnalyticsEvent("guide_opened", { source: slug });
  }, [slug]);

  return null;
}
