import createClient from "openapi-fetch";
import { ApiError, describeProblem } from "./apiError";
import { DEFAULT_API_URL } from "./config";
import type { paths } from "./schema";
import type { SearchResponse, SpeechDetail, TrendResponse } from "./types";

const client = createClient<paths>({
  baseUrl: process.env.API_URL ?? DEFAULT_API_URL,
});

type SearchParams = NonNullable<
  paths["/v1/speeches/search"]["get"]["parameters"]["query"]
>;
type TrendParams = NonNullable<paths["/v1/trends"]["get"]["parameters"]["query"]>;

interface ApiResult<T> {
  data?: T;
  error?: unknown;
  response: Response;
}

function unwrap<T>({ data, error, response }: ApiResult<T>): T {
  if (data === undefined) {
    throw new ApiError(response.status, describeProblem(error));
  }
  return data;
}

export async function searchSpeeches(query: SearchParams): Promise<SearchResponse> {
  return unwrap(await client.GET("/v1/speeches/search", { params: { query } }));
}

export async function getTrend(query: TrendParams): Promise<TrendResponse> {
  return unwrap(await client.GET("/v1/trends", { params: { query } }));
}

export async function getSpeech(id: string): Promise<SpeechDetail | null> {
  const result = await client.GET("/v1/speeches/{id}", { params: { path: { id } } });
  return result.response.status === 404 ? null : unwrap(result);
}
