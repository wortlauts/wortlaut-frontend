import { parseHighlight } from "@/lib/highlight";

export function Highlighted({ highlight }: { highlight: string }) {
  return parseHighlight(highlight).map((segment, index) =>
    segment.marked ? <mark key={index}>{segment.text}</mark> : segment.text,
  );
}
