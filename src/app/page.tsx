"use client";

import { Transaction } from "@/models/Transaction";
import BalanceCard from "../components/BalanceCard";
import Header from "../components/Header";
import MenuResponsive from "../components/MenuResponsive";
import NewTransactionCard from "../components/NewTransactionCard";
import StatementList from "../components/StatementList";
import styles from "./styles.module.scss";
import { useState } from "react";
import { transactions as mockTransactions } from "@/data/index";
import { useMediaQuery } from "react-responsive";

export default function Home() {
  const [transactions, setTransactions] =
    useState<Transaction[]>(mockTransactions);

  const isTablet = useMediaQuery({ minWidth: 600, maxWidth: 1199 });
  const isMobile = useMediaQuery({ maxWidth: 599 });

  const handleAddTransaction = (tx: Transaction) => {
    setTransactions((prev) => [tx, ...prev]);
  };

  const handleUpdateTransactions = (updated: Transaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  };

  const handleDeleteTransaction = (deleted: Transaction) => {
    setTransactions((prev) => prev.filter((t) => t.id !== deleted.id));
  };

  return (
    <div className={styles.container}>
      {!isMobile && !isTablet && (
        <div className={styles.menuDesktop}>
          <MenuResponsive />
        </div>
      )}

      <div className={styles.main}>
        <div className={styles.layout}>{!isMobile && <Header />}</div>

        {isTablet && (
          <div className={styles.menuTablet}>
            <MenuResponsive />
          </div>
        )}

        {isMobile && (
          <div className={styles.menuMobile}>
            <MenuResponsive />
          </div>
        )}

        <div className={styles.content}>
          <div className={styles.left}>
            <BalanceCard transactions={transactions} />
            <StatementList
              onDelete={handleDeleteTransaction}
              transactions={transactions}
              onUpdate={handleUpdateTransactions}
            />
          </div>
          <div className={styles.right}>
            <NewTransactionCard onAdd={handleAddTransaction} />
          </div>
        </div>
      </div>
    </div>
  );
}
