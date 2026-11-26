export function pageCount(total: number, pageSize: number): number {
  return Math.max(1, Math.ceil(total / pageSize));
}

const WINDOW_RADIUS = 2;

export function visiblePages(current: number, last: number): number[] {
  const first = Math.max(1, current - WINDOW_RADIUS);
  const end = Math.min(last, current + WINDOW_RADIUS);
  return Array.from({ length: end - first + 1 }, (_, index) => first + index);
}
