import LeadForm from "@/components/LeadForm";

type LeadCaptureBoxProps = {
  title: string;
  text: string;
  source: string;
  buttonLabel: string;
  segment?: string;
  interest?: string;
  leadMagnet?: string;
  dark?: boolean;
  compact?: boolean;
};

export default function LeadCaptureBox({
  title,
  text,
  source,
  buttonLabel,
  segment,
  interest,
  leadMagnet,
  dark = false,
  compact = false,
}: LeadCaptureBoxProps) {
  const sectionClass = dark
    ? "rounded-3xl bg-gray-950 p-6 text-white shadow-sm md:p-8"
    : "rounded-2xl border border-emerald-200 bg-emerald-50 p-5";
  const titleClass = compact ? "text-xl font-black" : "text-2xl font-black";
  const textClass = dark ? "mt-2 max-w-2xl text-gray-200" : "mt-2 text-sm leading-6 text-gray-700";

  return (
    <section className={sectionClass}>
      <h2 className={titleClass}>{title}</h2>
      <p className={textClass}>{text}</p>
      <LeadForm
        source={source}
        segment={segment}
        interest={interest}
        leadMagnet={leadMagnet}
        buttonLabel={buttonLabel}
        dark={dark}
      />
    </section>
  );
}
