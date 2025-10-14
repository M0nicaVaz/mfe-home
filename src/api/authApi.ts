import {
  mockRegister,
  mockLogin,
  mockVerifyToken,
} from '@/lib/localStorageAdapter';
import type { AuthResponse, LoginInput, RegisterInput, User } from '@/types/auth';

export async function registerUser(input: RegisterInput): Promise<AuthResponse> {
  return await mockRegister(input);
}

export async function loginUser(input: LoginInput): Promise<AuthResponse> {
  return await mockLogin(input);
}

export async function verifyToken(token: string): Promise<{ user: User }> {
  return await mockVerifyToken(token);
}
