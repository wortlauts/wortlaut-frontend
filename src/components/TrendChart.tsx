import type { TrendPoint } from "@/api/types";
import { formatTrendValue, trendValue } from "@/lib/trendValue";

interface TrendChartProps {
  points: TrendPoint[];
  normalized: boolean;
  label: string;
}

const WIDTH = 640;
const HEIGHT = 240;
const MARGIN = { top: 28, bottom: 32 };
const BAR_FILL_RATIO = 0.6;
const MAX_BAR_WIDTH = 96;

export function TrendChart({ points, normalized, label }: TrendChartProps) {
  const values = points.map((point) => trendValue(point, normalized));
  const maxValue = Math.max(...values, 0);
  const plotHeight = HEIGHT - MARGIN.top - MARGIN.bottom;
  const slotWidth = WIDTH / points.length;
  const barWidth = Math.min(slotWidth * BAR_FILL_RATIO, MAX_BAR_WIDTH);
  const baseline = HEIGHT - MARGIN.bottom;

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      role="img"
      aria-label={label}
      className="w-full max-w-2xl text-sm"
    >
      <line x1="0" x2={WIDTH} y1={baseline} y2={baseline} className="stroke-border" />
      {points.map((point, index) => {
        const value = values[index];
        const barHeight = maxValue > 0 ? (value / maxValue) * plotHeight : 0;
        const x = slotWidth * index + (slotWidth - barWidth) / 2;
        const center = x + barWidth / 2;
        return (
          <g key={point.key}>
            <title>{`${point.key}: ${formatTrendValue(value, normalized)}`}</title>
            <rect
              x={x}
              y={baseline - barHeight}
              width={barWidth}
              height={barHeight}
              className="fill-primary"
            />
            <text
              x={center}
              y={baseline - barHeight - 6}
              textAnchor="middle"
              className="fill-foreground"
            >
              {formatTrendValue(value, normalized)}
            </text>
            <text x={center} y={HEIGHT - 10} textAnchor="middle" className="fill-muted">
              {point.key}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
