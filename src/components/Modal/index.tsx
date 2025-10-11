"use client";

import styles from "./styles.module.scss";
import { InputSelect, Button, InputText, FileUploader } from "shared";
import { createPortal } from "react-dom";
import { useMounted } from "../../hooks";
import { Transaction } from "@/models/Transaction";
import type { TransactionType, Attachment } from "shared";
import { useState, useEffect } from "react";
import { formatCurrency, parseCurrencyInput, fileToBase64 } from "shared/utils";
import { useTransactionValidators } from "@/hooks/useTransactionValidators";

type ModalProps = {
  initialData: Transaction;
  isOpened: boolean;
  onSave: (data: Partial<Transaction>) => Promise<void>;
  handleModal: () => void;
};

export default function Modal({
  isOpened,
  handleModal,
  onSave,
  initialData,
}: ModalProps) {
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
    setType,
    setAmount,
    setTouched,
  } = useTransactionValidators();
  const mounted = useMounted();
  const [data, setData] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpened && initialData) {
      setData(initialData);
      setType(initialData.type);
      setAmount(initialData.amount);
      setTouched(false);
    }
  }, [isOpened, initialData, setAmount, setType, setTouched]);

  if (!mounted || !isOpened || !initialData) return null;

  const doc = document.body;

  const handleFileSelect = async (file: File) => {
    const base64 = await fileToBase64(file);
    const newAttachment: Attachment = {
      name: file.name,
      type: file.type,
      size: file.size,
      base64,
    };

    setData(
      (prev) =>
        new Transaction(
          prev.id,
          prev.clientId,
          prev.amount,
          prev.date,
          prev.direction,
          prev.type,
          newAttachment
        )
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    if (name === "type") {
      const newType = value as TransactionType;
      handleTypeChange(newType);
      setData(
        (prev) =>
          new Transaction(
            prev.id,
            prev.clientId,
            prev.amount,
            prev.date,
            Transaction.getDirectionFromType(newType),
            newType,
            prev.attachment
          )
      );
    } else if (name === "amount") {
      const parsedAmount = parseCurrencyInput(value);
      handleAmountChange(parsedAmount);
      setData(
        (prev) =>
          new Transaction(
            prev.id,
            prev.clientId,
            parsedAmount,
            prev.date,
            prev.direction,
            prev.type,
            prev.attachment
          )
      );
    }
  };

  const onHandleSave = async () => {
    if (!validateBeforeSubmit()) {
      return;
    }
    const updated = new Transaction(
      data.id,
      data.clientId,
      data.amount,
      data.date,
      data.direction,
      data.type,
      data.attachment
    );
    setIsSubmitting(true);
    try {
      await onSave(updated);
      resetForm();
    } catch (error) {
      console.error('[Modal] Erro ao salvar transação', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {createPortal(
        <div onClick={handleModal} className={styles.overlay}>
          <dialog
            className={styles.dialog}
            onClick={(e) => e.stopPropagation()}
          >
            <p className={styles.title}>Editar transação</p>
            <div className={styles.inputs}>
              <InputSelect
                name="type"
                value={type}
                labelText="Selecione o tipo de transação"
                placeholder="Selecione o tipo de transação"
                onChange={handleChange}
                options={[
                  { value: "depósito", label: "Depósito" },
                  { value: "saque", label: "Saque" },
                  { value: "investimento", label: "Investimento" },
                  { value: "pagamento", label: "Pagamento" },
                  { value: "transferência", label: "Transferência" },
                  { value: "outro", label: "Outro" },
                ]}
              />
              <InputText
                name="amount"
                labelText="Insira o valor"
                value={formatCurrency(amount)}
                onChange={handleChange}
                isError={!!showInputError}
                errorMessage={showInputError ? amountError : null}
              />
              {amountError && amountError.includes("⚠️") && touched && (
                <div className={styles.warning}>{amountError}</div>
              )}
            </div>
            <FileUploader onFileSelect={handleFileSelect} />
            <div className={styles.buttons}>
              <Button
                label="Cancelar"
                priority="secondary"
                size="large"
                onClick={handleModal}
              />
              <Button
                label="Confirmar"
                size="large"
                onClick={onHandleSave}
                disabled={!isFormValid || isSubmitting}
              />
            </div>
          </dialog>
        </div>,
        doc
      )}
    </>
  );
}
