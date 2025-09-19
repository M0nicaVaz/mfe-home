import { Transaction } from "./Transaction";

export class Client {
  id: string;
  name: string;
  email: string;
  transactions: Transaction[];

  constructor(
    id: string,
    name: string,
    email: string,
    transactions: Transaction[] = []
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.transactions = transactions;
  }

  calculateBalance(): number {
    return this.transactions.reduce((balance, tx) => {
      return tx.direction === "income"
        ? balance + tx.amount
        : balance - tx.amount;
    }, 0);
  }

  addTransaction(transaction: Transaction) {
    this.transactions.push(transaction);
  }
}
