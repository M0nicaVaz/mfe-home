import mockClients from "./mock-clients.json";
import { Client } from "@/models/Client";
import { Transaction } from "@/models/Transaction";
import { seedTransactions } from "shared/data";
import type {
  TransactionDTO,
  TransactionDirection,
  TransactionType,
} from "shared/types";

type TransactionData = TransactionDTO;

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

export const transactions: Transaction[] = seedTransactions.map((transaction) =>
  parseTransaction(transaction)
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
