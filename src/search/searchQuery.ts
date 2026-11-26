const SEARCH_PARAMS = [
  "q",
  "mode",
  "from",
  "to",
  "faction",
  "speaker",
  "legislative_period",
  "reaction",
  "sort",
  "page",
] as const;

const TREND_PARAMS = ["bucket", "normalize"] as const;

const PAGE_PARAMS = [...SEARCH_PARAMS, ...TREND_PARAMS] as const;

export type PageParam = (typeof PAGE_PARAMS)[number];
export type SearchParam = (typeof SEARCH_PARAMS)[number];

export type SearchQuery = Partial<Record<PageParam, string>>;

type RawParams = Record<string, string | string[] | undefined>;

const API_DEFAULTS: SearchQuery = { mode: "stem", sort: "relevance" };

const WHOLE_NUMBER = /^\d+$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const FORMAT_OF: Partial<Record<PageParam, RegExp>> = {
  page: WHOLE_NUMBER,
  legislative_period: WHOLE_NUMBER,
  from: ISO_DATE,
  to: ISO_DATE,
};

export function parseSearchQuery(raw: RawParams): SearchQuery {
  const query: SearchQuery = {};
  for (const name of PAGE_PARAMS) {
    const value = [raw[name]].flat()[0]?.trim();
    if (value && value !== API_DEFAULTS[name] && (FORMAT_OF[name]?.test(value) ?? true)) {
      query[name] = value;
    }
  }
  return query;
}

export function isCanonical(raw: RawParams, query: SearchQuery): boolean {
  return Object.keys(raw).length === Object.keys(query).length;
}

export function toApiSearchQuery(query: SearchQuery) {
  const { page, legislative_period: legislativePeriod, ...text } = pick(query, SEARCH_PARAMS);
  return {
    ...text,
    ...(legislativePeriod && { legislative_period: Number(legislativePeriod) }),
    ...(page && { page: Number(page) }),
  };
}

export function toApiTrendQuery(query: SearchQuery) {
  const { q, mode, faction, bucket, normalize } = query;
  return {
    q: q ?? "",
    mode,
    faction,
    bucket,
    normalize: normalize === "true",
  };
}

export function searchHref(query: SearchQuery, changes: SearchQuery = {}): string {
  const startsNewResultList = !("page" in changes);
  const merged: SearchQuery = {
    ...query,
    ...changes,
    ...(startsNewResultList && { page: undefined }),
  };
  const params = new URLSearchParams();
  for (const name of PAGE_PARAMS) {
    const value = merged[name];
    if (value) {
      params.set(name, value);
    }
  }
  const queryString = params.toString();
  return queryString ? `/search?${queryString}` : "/search";
}

export function withoutParam(query: SearchQuery, name: PageParam): SearchQuery {
  const rest = { ...query };
  delete rest[name];
  return rest;
}

function pick<T extends string>(query: SearchQuery, names: readonly T[]) {
  const picked: Partial<Record<T, string>> = {};
  for (const name of names) {
    const value = query[name as PageParam];
    if (value) {
      picked[name] = value;
    }
  }
  return picked;
}
