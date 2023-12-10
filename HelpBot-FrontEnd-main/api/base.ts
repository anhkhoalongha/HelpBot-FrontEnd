export async function request<T>(
  method: string,
  path: string,
  headers?: HeadersInit,
  body?: BodyInit,
) {
  const response = await fetch(path, {
    method,
    headers,
    body,
    cache: 'no-store',
  });

  if (response.status >= 400) {
    return undefined;
  }

  return (await response.json()) as T;
}
