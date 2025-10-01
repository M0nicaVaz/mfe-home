"use client";

import { Card, InputSelect, InputText, Button, FileUploader } from "shared";
import styles from "./styles.module.scss";
import { Transaction, TransactionType } from "@/models/Transaction";
import { useState } from "react";
import { formatCurrency, parseCurrencyInput } from "shared/utils";

interface NewTransactionCardProps {
  onAdd: (transaction: Transaction) => void;
}

export default function NewTransactionCard({ onAdd }: NewTransactionCardProps) {
  const [type, setType] = useState<TransactionType>("depósito");
  const [amount, setAmount] = useState<number>(0);

  const handleSubmit = () => {
    const direction = Transaction.getDirectionFromType(type);

    const newTransaction = new Transaction(
      crypto.randomUUID(),
      "123",
      amount,
      new Date().toISOString(),
      direction,
      type
    );

    onAdd(newTransaction);

    setAmount(0);
    setType("depósito");
  };

  return (
    <div className={styles.container}>
      <Card>
        <div className={styles.content}>
          <h3 className={styles.title}>Nova transação</h3>
          <InputSelect
            name="type"
            value={type}
            labelText="Selecione o tipo de transação"
            placeholder="Selecione o tipo de transação"
            onChange={(e) => setType(e.target.value as TransactionType)}
            options={[
              { value: "depósito", label: "Depósito" },
              { value: "saque", label: "Saque" },
              { value: "investimento", label: "Investimento" },
              { value: "pagamento", label: "Pagamento" },
              { value: "transferência", label: "Transferência" },
              { value: "outro", label: "Outro" },
            ]}
          />
          <div style={{ height: "1.5rem" }}></div>
          <InputText
            name="amount"
            value={formatCurrency(amount).toString()}
            onChange={(e) => {
              const parsedAmount = parseCurrencyInput(e.target.value);
              setAmount(parsedAmount);
            }}
            labelText="Valor"
            placeholder="Digite o valor"
          />
          <div style={{ height: "2em" }}></div>
          <FileUploader />
          <div style={{ height: "2em" }}></div>
          <Button label="Confirmar" size="large" onClick={handleSubmit} />
        </div>
      </Card>
    </div>
  );
}
