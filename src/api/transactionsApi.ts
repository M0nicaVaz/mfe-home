import { Transaction } from '@/models/Transaction';
import {
  mockFetchTransactions,
  mockCreateTransaction,
  mockUpdateTransaction,
  mockDeleteTransaction,
} from '@/lib/localStorageAdapter';
import type {
  TransactionDTO,
  TransactionCreateInput,
  TransactionUpdateInput,
} from 'shared';

const toTransaction = (dto: TransactionDTO): Transaction => Transaction.fromDTO(dto);

export async function fetchTransactions(): Promise<Transaction[]> {
  const data = await mockFetchTransactions();
  return data.map(toTransaction);
}

export async function createTransaction(
  payload: TransactionCreateInput,
): Promise<Transaction> {
  const data = await mockCreateTransaction(payload);
  return toTransaction(data);
}

export async function updateTransaction(
  payload: TransactionUpdateInput,
): Promise<Transaction> {
  const data = await mockUpdateTransaction(payload);
  return toTransaction(data);
}

export async function deleteTransaction(id: string): Promise<Transaction> {
  await mockDeleteTransaction(id);
  return new Transaction(id, '', 0, '', 'outcome', 'outro');
}
