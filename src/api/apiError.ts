export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

interface ProblemBody {
  title?: string;
  errors?: Record<string, string[]>;
}

export function describeProblem(body: unknown): string {
  const { title, errors } = (body ?? {}) as ProblemBody;
  const details = Object.values(errors ?? {}).flat();
  return details.length > 0 ? details.join(" ") : (title ?? "Unbekannter Fehler");
}
