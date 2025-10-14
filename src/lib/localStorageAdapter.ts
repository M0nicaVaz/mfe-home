import { seedTransactions } from 'shared';
import type {
  TransactionDTO,
  TransactionCreateInput,
  TransactionUpdateInput
} from 'shared';
import type { AuthResponse, LoginInput, RegisterInput, User } from '@/types/auth';

const STORAGE_KEYS = {
  USERS: 'mfe-finance-users',
  TRANSACTIONS: 'mfe-finance-transactions',
  CURRENT_USER: 'mfe-finance-current-user',
};


function getUsers(): User[] {
  const data = localStorage.getItem(STORAGE_KEYS.USERS);
  return data ? (JSON.parse(data) as User[]) : [];
}

function saveUsers(users: User[]): void {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

function getTransactions(): TransactionDTO[] {
  const data = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
  if (!data) {
    const seeded = seedTransactions.map((t) => ({
      ...t,
      userId: 'demo-user',
    }));
    saveTransactions(seeded);
    return seeded;
  }
  return JSON.parse(data) as TransactionDTO[];
}

function saveTransactions(transactions: TransactionDTO[]): void {
  localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
}

function getCurrentUser(): (User & { token: string }) | null {
  const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return data ? (JSON.parse(data) as User & { token: string }) : null;
}

function setCurrentUser(user: User & { token: string }): void {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
}

function clearCurrentUser(): void {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
}


export async function mockRegister(input: RegisterInput): Promise<AuthResponse> {
  const users = getUsers();

  if (users.find((u) => u.email === input.email)) {
    throw new Error('Email já cadastrado');
  }

  const newUser: User = {
    id: crypto.randomUUID(),
    email: input.email,
    password: input.password, // Em produção real, deveria hashear
    name: input.name,
    created_at: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);

  const token = `mock-token-${newUser.id}`;
  setCurrentUser({ ...newUser, token });

  return {
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      created_at: newUser.created_at,
    },
    token,
  };
}

export async function mockLogin(input: LoginInput): Promise<AuthResponse> {
  const users = getUsers();
  const user = users.find((u) => u.email === input.email && u.password === input.password);

  if (!user) {
    throw new Error('Credenciais inválidas');
  }

  const token = `mock-token-${user.id}`;
  setCurrentUser({ ...user, token });

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      created_at: user.created_at,
    },
    token,
  };
}

export async function mockVerifyToken(token: string): Promise<{ user: User }> {
  const currentUser = getCurrentUser();

  if (!currentUser || currentUser.token !== token) {
    throw new Error('Token inválido');
  }

  return {
    user: {
      id: currentUser.id,
      email: currentUser.email,
      name: currentUser.name,
      created_at: currentUser.created_at,
      password: currentUser.password,
    },
  };
}

export function mockLogout(): void {
  clearCurrentUser();
}

export async function mockFetchTransactions(): Promise<TransactionDTO[]> {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    throw new Error('Não autenticado');
  }

  const allTransactions = getTransactions();
  return allTransactions.filter((t) => t.userId === currentUser.id || t.userId === 'demo-user');
}

export async function mockCreateTransaction(input: TransactionCreateInput): Promise<TransactionDTO> {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    throw new Error('Não autenticado');
  }

  const transactions = getTransactions();

  const newTransaction: TransactionDTO = {
    ...input,
    userId: currentUser.id,
  };

  transactions.unshift(newTransaction);
  saveTransactions(transactions);

  return newTransaction;
}

export async function mockUpdateTransaction(input: TransactionUpdateInput): Promise<TransactionDTO> {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    throw new Error('Não autenticado');
  }

  const transactions = getTransactions();
  const index = transactions.findIndex((t) => t.id === input.id);

  if (index === -1) {
    throw new Error('Transação não encontrada');
  }

  if (transactions[index].userId !== currentUser.id && transactions[index].userId !== 'demo-user') {
    throw new Error('Sem permissão para atualizar esta transação');
  }

  transactions[index] = {
    ...transactions[index],
    ...input,
    userId: transactions[index].userId,
  };

  saveTransactions(transactions);
  return transactions[index];
}

export async function mockDeleteTransaction(id: string): Promise<void> {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    throw new Error('Não autenticado');
  }

  const transactions = getTransactions();
  const index = transactions.findIndex((t) => t.id === id);

  if (index === -1) {
    throw new Error('Transação não encontrada');
  }

  if (transactions[index].userId !== currentUser.id && transactions[index].userId !== 'demo-user') {
    throw new Error('Sem permissão para deletar esta transação');
  }

  transactions.splice(index, 1);
  saveTransactions(transactions);
}

export async function isApiAvailable(): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`, {
      method: 'GET',
      cache: 'no-store',
    });
    return response.ok;
  } catch {
    return false;
  }
}
