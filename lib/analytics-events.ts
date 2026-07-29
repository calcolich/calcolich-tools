export type AnalyticsEventName =
  | "calculator_start"
  | "calculator_started"
  | "calculator_complete"
  | "calculator_completed"
  | "language_change"
  | "related_calculator_click"
  | "related_calculator_clicked"
  | "guide_click"
  | "guide_opened"
  | "official_source_clicked"
  | "lead_submit"
  | "lead_form_started"
  | "lead_form_submitted"
  | "cta_click"
  | "tax_help_cta_clicked";

type AnalyticsEventPayload = {
  source?: string;
  target?: string;
  calculatorId?: string;
};

export function sendAnalyticsEvent(event: AnalyticsEventName, payload: AnalyticsEventPayload = {}) {
  if (typeof window === "undefined") return;

  const body = JSON.stringify({
    event,
    source: payload.source,
    target: payload.target,
    calculatorId: payload.calculatorId,
    page: window.location.pathname,
  });

  const analyticsWindow = window as Window & {
    gtag?: (command: "event", event: string, params: Record<string, string | undefined>) => void;
  };

  analyticsWindow.gtag?.("event", event, {
    event_source: payload.source,
    event_target: payload.target,
    calculator_id: payload.calculatorId,
    page_path: window.location.pathname,
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
