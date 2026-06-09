export function publicCopy(text: string) {
  return text
    .replace(/\bSvizzera\s+e\s+Puglia\b/g, "Business locali")
    .replace(/\bin Svizzera\b/g, "")
    .replace(/\bIn Svizzera\b/g, "In molti casi")
    .replace(/\bper la Svizzera\b/g, "online")
    .replace(/\bsvizzer[aoie]\b/g, "locali")
    .replace(/\bSvizzer[aoie]\b/g, "Locali")
    .replace(/\s+Svizzera\b/g, "")
    .replace(/\s+svizzera\b/g, "")
    .replace(/\bPuglia\b/g, "mercato locale")
    .replace(/\bpuglia\b/g, "mercato locale")
    .replace(/\bTorre Suda\b/g, "mercato locale")
    .replace(/\bCapilungo\b/g, "mercato locale")
    .replace(/\bper aziende in e mercato locale\b/g, "per aziende locali")
    .replace(/\bper aziende in mercato locale\b/g, "per aziende locali")
    .replace(/\s{2,}/g, " ")
    .trim();
}
