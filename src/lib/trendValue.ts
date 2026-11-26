import type { TrendPoint } from "@/api/types";

export function trendValue(point: TrendPoint, normalized: boolean): number {
  return normalized ? (point.ratio ?? 0) : point.count;
}

export function formatTrendValue(value: number, normalized: boolean): string {
  return normalized
    ? new Intl.NumberFormat("de-DE", { style: "percent", maximumFractionDigits: 1 }).format(value)
    : value.toLocaleString("de-DE");
}
