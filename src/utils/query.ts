interface Request {}

export function buildQuery(request: Request): string {
  const queryParams: string[] = [];

  for (const [key, value] of Object.entries(request)) {
    if (value !== undefined) {
      queryParams.push(`${key}=${JSON.stringify(value)}`);
    }
  }

  return queryParams.join('&');
}
