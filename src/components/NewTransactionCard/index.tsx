"use client";

import { Card, InputSelect, InputText, Button, FileUploader } from "shared";
import styles from "./styles.module.scss";
import { Transaction, TransactionType, Attachment } from "@/models/Transaction";
import { formatCurrency, parseCurrencyInput, fileToBase64 } from "shared/utils";
import { useTransactionValidators } from "@/hooks/useTransactionValidators";
import { useState } from "react";
import { uploadToS3 } from "../../utils/uploadFile"

interface NewTransactionCardProps {
  onAdd: (transaction: Transaction) => void;
}

export default function NewTransactionCard({ onAdd }: NewTransactionCardProps) {
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
    setAttachment({
      name: file.name,
      type: file.type,
      size: file.size,
      file,
    });
  };

  const handleSubmit = async () => {
    if (!validateBeforeSubmit()) {
      return;
    }

    if(attachment?.file) {
      try {
        const { url, key } = await uploadToS3(attachment.file as File);
        attachment.url = url;
        attachment.key = key;
      } catch (err) {
        console.log(err)
      }
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

    onAdd(newTransaction);
    resetForm();
    setAttachment(undefined);
  };

  return (
    <div className={styles.container}>
      <Card title="Nova transação">
        <div className={styles.content}>
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
          <FileUploader 
            file={attachment?.file}
            onFileSelect={handleFileSelect} 
          />
          <div style={{ height: "2em" }}></div>
          <Button
            label="Confirmar"
            size="large"
            onClick={handleSubmit}
            disabled={!isFormValid}
          />
        </div>
      </Card>
    </div>
  );
}
