"use client";
import { Card } from "shared";
import TransactionItem from "../TransactionItem";
import Pagination from "../Pagination";
import styles from "./styles.module.scss";
import { Transaction } from "@/models/Transaction";
import { ReactNode } from "react";

interface StatementListProps {
  transactions: Transaction[];
  onUpdate: (updated: Transaction) => Promise<void>;
  onDelete: (deleted: Transaction) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export default function StatementList({
  transactions,
  onUpdate,
  onDelete,
  isLoading = false,
  error = null,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}: StatementListProps) {
  let content: ReactNode;

  if (isLoading && transactions.length === 0) {
    content = <p>Carregando transações...</p>;
  } else if (error) {
    content = <p>Não foi possível carregar as transações: {error}</p>;
  } else if (transactions.length === 0) {
    content = <p>Nenhuma transação encontrada.</p>;
  } else {
    content = transactions.map((transaction) => (
      <TransactionItem
        id={transaction.id}
        onDelete={onDelete}
        key={transaction.id}
        transaction={transaction}
        onUpdate={onUpdate}
      />
    ));
  }

  return (
    <div className={styles.container}>
      <Card title="Extrato">
        <div className={styles.cardBox}>
          <div className={styles.transactionsList}>
            {content}
          </div>
          {onPageChange && (
            <div className={styles.paginationWrapper}>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
