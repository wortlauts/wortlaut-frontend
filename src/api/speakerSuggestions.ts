import createClient from "openapi-fetch";
import type { paths } from "./schema";
import type { SpeakerSuggestion } from "./types";

const client = createClient<paths>({ baseUrl: "/api" });

export async function suggestSpeakers(
  prefix: string,
  signal: AbortSignal,
): Promise<SpeakerSuggestion[]> {
  const { data } = await client.GET("/v1/speakers/suggest", {
    params: { query: { q: prefix } },
    signal,
  });
  return data ?? [];
}
