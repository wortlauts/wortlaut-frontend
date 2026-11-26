"use client";

import { useEffect, useId, useState } from "react";
import { suggestSpeakers } from "@/api/speakerSuggestions";
import type { SpeakerSuggestion } from "@/api/types";

const MIN_PREFIX_LENGTH = 2;
const DEBOUNCE_MS = 250;

export function SpeakerInput({ defaultValue }: { defaultValue?: string }) {
  const listId = useId();
  const [text, setText] = useState(defaultValue ?? "");
  const [suggestions, setSuggestions] = useState<SpeakerSuggestion[]>([]);

  useEffect(() => {
    const prefix = text.trim();
    if (prefix.length < MIN_PREFIX_LENGTH) {
      return;
    }
    const controller = new AbortController();
    const timer = setTimeout(() => {
      suggestSpeakers(prefix, controller.signal)
        .then(setSuggestions)
        .catch(() => undefined);
    }, DEBOUNCE_MS);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [text]);

  return (
    <>
      <input
        type="text"
        name="speaker"
        value={text}
        onChange={(event) => setText(event.target.value)}
        list={listId}
        autoComplete="off"
        className="w-full rounded-md border border-border bg-surface px-3 py-2"
      />
      <datalist id={listId}>
        {suggestions.map((speaker) => (
          <option key={speaker.id} value={speaker.name}>
            {speaker.faction}
          </option>
        ))}
      </datalist>
    </>
  );
}
