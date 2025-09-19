"use client";

import styles from "./styles.module.scss";
import { InputSelect, Button, InputText } from "shared";
import { createPortal } from "react-dom";
import { useMounted } from "../../hooks";
import { Transaction, TransactionType } from "@/models/Transaction";
import { useState, useEffect } from "react";
import { formatCurrency, parseCurrencyInput } from "shared/utils";

type ModalProps = {
  initialData: Transaction;
  isOpened: boolean;
  onSave: (data: Partial<Transaction>) => void;
  handleModal: () => void;
};

export default function Modal({
  isOpened,
  handleModal,
  onSave,
  initialData,
}: ModalProps) {
  const mounted = useMounted();
  const [data, setData] = useState(initialData);

  useEffect(() => {
    if (isOpened && initialData) {
      setData(initialData);
    }
  }, [isOpened, initialData]);

  if (!mounted || !isOpened || !initialData) return null;

  const doc = document.body;

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    if (name === "type") {
      const newType = value as TransactionType;
      setData(
        (prev) =>
          new Transaction(
            prev.id,
            prev.clientId,
            prev.amount,
            prev.date,
            Transaction.getDirectionFromType(newType),
            newType
          )
      );
    } else if (name === "amount") {
      const newAmount = parseCurrencyInput(value);

      setData(
        (prev) =>
          new Transaction(
            prev.id,
            prev.clientId,
            newAmount,
            prev.date,
            prev.direction,
            prev.type
          )
      );
    }
  };

  const onHandleSave = () => {
    const updated = new Transaction(
      data.id,
      data.clientId,
      data.amount,
      data.date,
      data.direction,
      data.type
    );
    onSave(updated);
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
                value={data.type}
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
                value={formatCurrency(data.amount)}
                onChange={handleChange}
              />
            </div>
            <div className={styles.buttons}>
              <Button
                label="Cancelar"
                priority="secondary"
                size="large"
                onClick={handleModal}
              />
              <Button label="Confirmar" size="large" onClick={onHandleSave} />
            </div>
          </dialog>
        </div>,
        doc
      )}
    </>
  );
}
