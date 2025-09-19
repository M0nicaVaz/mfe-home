import mockClients from "./mock-clients.json";
import mockTransactions from "./mock-transactions.json";
import { Client } from "@/models/Client";
import {
  Transaction,
  TransactionDirection,
  TransactionType,
} from "@/models/Transaction";

interface TransactionData {
  id: string;
  clientId: string;
  amount: number;
  date: string;
  direction: TransactionDirection;
  type: TransactionType;
}

function parseTransaction(t: TransactionData): Transaction {
  return new Transaction(
    t.id,
    t.clientId,
    t.amount,
    t.date,
    t.direction,
    t.type
  );
}

export const transactions: Transaction[] = mockTransactions.map((t) =>
  parseTransaction({
    ...t,
    direction: t.direction as TransactionDirection,
    type: t.type as TransactionType,
  })
);

function parseClients(c: {
  transactions: {
    id: string;
    clientId: string;
    amount: number;
    date: string;
    direction: string;
    transactionType: string;
  }[];
  id: string;
  name: string;
  email: string;
}): Client {
  const transactions = c.transactions.map((t) =>
    parseTransaction({
      id: t.id,
      clientId: t.clientId,
      amount: t.amount,
      date: t.date,
      direction: t.direction as TransactionDirection,
      type: t.transactionType as TransactionType,
    })
  );
  return new Client(c.id, c.name, c.email, transactions);
}

export const clients: Client[] = mockClients.map(parseClients);
