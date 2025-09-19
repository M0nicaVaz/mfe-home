"use client";
import { Card } from "shared";
import TransactionItem from "../TransactionItem";
import styles from "./styles.module.scss";
import { Transaction } from "@/models/Transaction";

interface StatementListProps {
  transactions: Transaction[];
  onUpdate: (updated: Transaction) => void;
  onDelete: (deleted: Transaction) => void;
}

export default function StatementList({
  transactions,
  onUpdate,
  onDelete,
}: StatementListProps) {
  if (transactions.length === 0) {
    return <p>Nenhuma transação encontrada.</p>;
  }
  return (
    <div className={styles.container}>
      <Card title="Extrato">
        <div className={styles.cardBox}>
          {transactions.map((transaction) => (
            <TransactionItem
              id={transaction.id}
              onDelete={onDelete}
              key={transaction.id}
              transaction={transaction}
              onUpdate={onUpdate}
            />
          ))}
        </div>
      </Card>
    </div>
  );
}
