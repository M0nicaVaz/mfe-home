import { apiRequest } from '@/lib/apiClient';
import type { AuthResponse, LoginInput, RegisterInput, User } from '@/types/auth';

const AUTH_PATH = '/auth';

export async function registerUser(input: RegisterInput): Promise<AuthResponse> {
  return await apiRequest<AuthResponse>(`${AUTH_PATH}/register`, {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export async function loginUser(input: LoginInput): Promise<AuthResponse> {
  return await apiRequest<AuthResponse>(`${AUTH_PATH}/login`, {
    method: 'POST',
    body: JSON.stringify(input),
  });
}

export async function verifyToken(token: string): Promise<{ user: User }> {
  return await apiRequest<{ user: User }>(`${AUTH_PATH}/verify`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
