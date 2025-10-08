"use client";

import { Card } from "shared";
import styles from "./styles.module.scss";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { formatCurrency } from "shared/utils";
import { Transaction } from "@/models/Transaction";
import { useMemo, useState } from "react";

interface BalanceCardProps {
  transactions: Transaction[];
}

export default function BalanceCard({ transactions }: BalanceCardProps) {
  const calculateBalance = (transactions: Transaction[]): number => {
    return transactions.reduce((acc, tx) => {
      if (tx.direction === "income") {
        return acc + tx.amount;
      } else if (tx.direction === "outcome") {
        return acc - tx.amount;
      }
      return acc;
    }, 0);
  };

  const balance = useMemo(() => calculateBalance(transactions), [transactions]);
  const isNegativeBalance = balance < 0;

  const [isHidden, setIsHidden] = useState(false);

  const formattedBalance = formatCurrency(balance);
  const maskedBalance = "R$ " + "*".repeat(Math.max(formattedBalance.length - 2, 0));

  return (
    <div className={styles.container}>
      <Card title="Saldo">
        <Card color="secondary">
          <div className={styles.innerCard}>
            <p
              className={`${styles.text} ${
                isNegativeBalance ? styles.isNegativeBalance : ""
              }`}
            >
              {isHidden ? maskedBalance : formattedBalance}
            </p>
            <button
              type="button"
              onClick={() => setIsHidden((prev) => !prev)}
              className={styles.iconButton}
            >
              {isHidden ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </button>
          </div>
        </Card>
      </Card>
    </div>
  );
}
