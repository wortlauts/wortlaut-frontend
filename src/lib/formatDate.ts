const GERMAN_DATE = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "UTC",
});

export function formatDate(isoDate: string): string {
  return GERMAN_DATE.format(new Date(isoDate));
}
