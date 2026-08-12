const API_ROOT = '/api';
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}
export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const isFormData = init?.body instanceof FormData;
  const response = await fetch(`${API_ROOT}${path}`, {
    ...init,
    credentials: 'include',
    headers: isFormData ? { ...init?.headers } : { 'Content-Type': 'application/json', ...init?.headers },
  });
  if (!response.ok) {
    const body = (await response.json().catch(() => ({ message: 'خطایی پیش آمد' }))) as { message?: string };
    throw new ApiError(body.message ?? 'خطایی پیش آمد', response.status);
  }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}
