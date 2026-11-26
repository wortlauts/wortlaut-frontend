export const MODE_LABELS: Record<string, string> = {
  stem: "Wortformen (Stammformen)",
  phrase: "Genaue Wortfolge",
  fuzzy: "Ähnliche Schreibweisen",
};

export const SORT_LABELS: Record<string, string> = {
  relevance: "Relevanz",
  date: "Datum, neueste zuerst",
};

export const REACTION_LABELS: Record<string, string> = {
  applause: "Beifall",
  laughter: "Heiterkeit",
  heckle: "Zwischenruf",
  objection: "Widerspruch",
};

export const BUCKET_LABELS: Record<string, string> = {
  year: "pro Jahr",
  legislative_period: "pro Wahlperiode",
};

export const DELIVERY_LABELS: Record<string, string> = {
  plenary: "Rede im Plenum",
  written_statement: "Schriftliche Erklärung",
};

export function labelOf(labels: Record<string, string>, key: string): string {
  return labels[key] ?? key;
}
