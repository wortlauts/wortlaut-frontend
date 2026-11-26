import type { components } from "./schema";

type Schemas = components["schemas"];

export type SearchResponse = Schemas["SearchResponse"];
export type SearchHit = Schemas["SearchHit"];
export type FacetValue = Schemas["FacetValue"];
export type SpeechDetail = Schemas["SpeechDetail"];
export type ReactionInfo = Schemas["ReactionInfo"];
export type TrendResponse = Schemas["TrendResponse"];
export type TrendPoint = Schemas["TrendPoint"];
export type SpeakerSuggestion = Schemas["SpeakerSuggestion"];
