import { Card } from "shared";
import styles from "./styles.module.scss";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { formatCurrency } from "shared/utils";
import { Transaction } from "@/models/Transaction";
import { useMemo } from "react";

interface BalanceCardProps {
  transactions: Transaction[];
}

export default function BalanceCard({ transactions }: BalanceCardProps) {
  function calculateBalance(transactions: Transaction[]): number {
    return transactions.reduce((acc, tx) => {
      if (tx.direction === "income") {
        return acc + tx.amount;
      } else if (tx.direction === "outcome") {
        return acc - tx.amount;
      }
      return acc;
    }, 0);
  }
  const isNegativeBalance = calculateBalance(transactions) < 0;
  const saldo = useMemo(() => calculateBalance(transactions), [transactions]);

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
              {formatCurrency(saldo)}
            </p>
            <VisibilityOffIcon />
          </div>
        </Card>
      </Card>
    </div>
  );
}
