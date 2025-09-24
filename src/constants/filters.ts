import { TransactionDirection, TransactionType } from '@/models/Transaction';

export const TRANSACTION_TYPE_LABELS: Record<TransactionType, string> = {
  depósito: 'Depósito',
  saque: 'Saque',
  investimento: 'Investimento',
  pagamento: 'Pagamento',
  transferência: 'Transferência',
  outro: 'Outro',
};

export const DIRECTION_LABELS: Record<TransactionDirection, string> = {
  income: 'Entrada',
  outcome: 'Saída',
};

export const AMOUNT_FILTER_LIMITS = {
  min: 1,
  max: 100000,
};

export const TRANSACTION_TYPE_OPTIONS: {
  value: '' | TransactionType;
  label: string;
}[] = [
  { value: '', label: 'Todos os tipos' },
  { value: 'depósito', label: TRANSACTION_TYPE_LABELS['depósito'] },
  { value: 'saque', label: TRANSACTION_TYPE_LABELS['saque'] },
  { value: 'investimento', label: TRANSACTION_TYPE_LABELS['investimento'] },
  { value: 'pagamento', label: TRANSACTION_TYPE_LABELS['pagamento'] },
  {
    value: 'transferência',
    label: TRANSACTION_TYPE_LABELS['transferência'],
  },
  { value: 'outro', label: TRANSACTION_TYPE_LABELS['outro'] },
];

export const DIRECTION_OPTIONS: {
  value: '' | TransactionDirection;
  label: string;
}[] = [
  { value: '', label: 'Todas as direções' },
  { value: 'income', label: DIRECTION_LABELS.income },
  { value: 'outcome', label: DIRECTION_LABELS.outcome },
];
