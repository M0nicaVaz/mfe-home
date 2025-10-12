const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');

function ensureBaseUrl(): string {
  if (!API_BASE_URL) {
    throw new Error(
      'NEXT_PUBLIC_API_URL is not configured. Please define it in your environment.',
    );
  }
  return API_BASE_URL;
}

type RequestOptions = RequestInit & {
  skipJson?: boolean;
};

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const baseUrl = ensureBaseUrl();
  const method = (options.method ?? 'GET').toUpperCase();
  const shouldSetJsonHeader =
    method !== 'GET' && method !== 'HEAD' ? true : Boolean(options.body);

  const headers = new Headers(options.headers ?? undefined);

  if (shouldSetJsonHeader && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers,
    cache: 'no-store',
  });

  if (!response.ok) {
    let message = response.statusText;
    try {
      const payload = await response.json();
      if (payload?.message) {
        message = payload.message;
      }
    } catch {
      // ignore JSON parse errors
    }

    throw new Error(message);
  }

  if (options.skipJson || response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
