import { apiRequest } from '@/lib/apiClient';
import { Transaction } from '@/models/Transaction';
import type {
  TransactionDTO,
  TransactionCreateInput,
  TransactionUpdateInput,
} from 'shared';

const BASE_PATH = '/transactions';

const toTransaction = (dto: TransactionDTO): Transaction => Transaction.fromDTO(dto);

export async function fetchTransactions(): Promise<Transaction[]> {
  const data = await apiRequest<TransactionDTO[]>(BASE_PATH);
  return data.map(toTransaction);
}

export async function createTransaction(
  payload: TransactionCreateInput,
): Promise<Transaction> {
  const data = await apiRequest<TransactionDTO>(BASE_PATH, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return toTransaction(data);
}

export async function updateTransaction(
  payload: TransactionUpdateInput,
): Promise<Transaction> {
  const { id, ...rest } = payload;
  const data = await apiRequest<TransactionDTO>(`${BASE_PATH}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(rest),
  });
  return toTransaction(data);
}

export async function deleteTransaction(id: string): Promise<Transaction> {
  const data = await apiRequest<TransactionDTO>(`${BASE_PATH}/${id}`, {
    method: 'DELETE',
  });
  return toTransaction(data);
}
