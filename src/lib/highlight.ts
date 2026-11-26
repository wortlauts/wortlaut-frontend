export interface TextSegment {
  text: string;
  marked: boolean;
}

const MARK_TAG = /<\/?mark>/;
const HTML_ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#x27;": "'",
  "&#x2F;": "/",
};

export function parseHighlight(highlight: string): TextSegment[] {
  const parts = highlight.split(/(<\/?mark>)/);
  let marked = false;
  const segments: TextSegment[] = [];
  for (const part of parts) {
    if (MARK_TAG.test(part)) {
      marked = part === "<mark>";
    } else if (part) {
      segments.push({ text: decodeEntities(part), marked });
    }
  }
  return segments;
}

function decodeEntities(text: string): string {
  return text.replace(/&(?:amp|lt|gt|quot|#x27|#x2F);/g, (entity) => HTML_ENTITIES[entity]);
}
