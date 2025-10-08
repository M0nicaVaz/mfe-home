"use client";

import { Card, InputSelect, InputText, Button, FileUploader } from "shared";
import styles from "./styles.module.scss";
import { Transaction } from "@/models/Transaction";
import type { TransactionType, Attachment } from "shared";
import { formatCurrency, parseCurrencyInput, fileToBase64 } from "shared/utils";
import { useTransactionValidators } from "@/hooks/useTransactionValidators";
import { useState } from "react";

interface NewTransactionCardProps {
  onAdd: (transaction: Transaction) => Promise<void>;
  isLoading?: boolean;
}

export default function NewTransactionCard({
  onAdd,
  isLoading = false,
}: NewTransactionCardProps) {
  const {
    type,
    amount,
    amountError,
    touched,
    isFormValid,
    showInputError,
    handleAmountChange,
    handleTypeChange,
    resetForm,
    validateBeforeSubmit,
  } = useTransactionValidators();

  const [attachment, setAttachment] = useState<Attachment | undefined>(
    undefined
  );

  const handleFileSelect = async (file: File) => {
    const base64 = await fileToBase64(file);
    setAttachment({
      name: file.name,
      type: file.type,
      size: file.size,
      base64,
    });
  };

  const handleSubmit = async () => {
    if (!validateBeforeSubmit()) {
      return;
    }

    const direction = Transaction.getDirectionFromType(type);
    const newTransaction = new Transaction(
      crypto.randomUUID(),
      "123",
      amount,
      new Date().toISOString(),
      direction,
      type,
      attachment
    );

    try {
      await onAdd(newTransaction);
      resetForm();
      setAttachment(undefined);
    } catch (error) {
      console.error('[NewTransactionCard] Erro ao adicionar transação', error);
    }
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
            onChange={(e) =>
              handleTypeChange(e.target.value as TransactionType)
            }
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
              handleAmountChange(parsedAmount);
            }}
            labelText="Valor"
            placeholder="Digite o valor"
            isError={!!showInputError}
            errorMessage={showInputError ? amountError : null}
          />
          {amountError && amountError.includes("⚠️") && touched && (
            <div className={styles.warning}>{amountError}</div>
          )}
          <div style={{ height: "2em" }}></div>
          <FileUploader onFileSelect={handleFileSelect} />
          <div style={{ height: "2em" }}></div>
          <Button
            label="Confirmar"
            size="large"
            onClick={handleSubmit}
            disabled={!isFormValid || isLoading}
          />
        </div>
      </Card>
    </div>
  );
}
