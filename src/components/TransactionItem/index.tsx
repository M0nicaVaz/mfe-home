import { Divider, IconButton } from "shared";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import styles from "./styles.module.scss";
import Modal from "../Modal";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useState } from "react";
import { Transaction } from "@/models/Transaction";
import { capitalize, formatDate } from "shared/utils";

type TransactionItemProps = {
  id?: string;
  transaction: Transaction;
  hasDivider?: boolean;
  isOpened?: boolean;
  onUpdate: (updated: Transaction) => Promise<void>;
  onDelete: (deleted: Transaction) => Promise<void>;
};

export default function TransactionItem({
  id,
  transaction,
  hasDivider = true,
  onUpdate,
  onDelete,
}: TransactionItemProps) {
  const [isOpen, setisOpen] = useState(false);

  const handleModal = () => {
    setisOpen((prev) => !prev);
  };

  const handleSave = async (updatedData: Partial<Transaction>) => {
    const updated = new Transaction(
      transaction.id,
      updatedData.clientId ?? transaction.clientId,
      updatedData.amount ?? transaction.amount,
      updatedData.date ?? transaction.date,
      updatedData.direction ?? transaction.direction,
      updatedData.type ?? transaction.type,
      updatedData.attachment ?? transaction.attachment
    );
    try {
      await onUpdate(updated);
      setisOpen(false);
    } catch (error) {
      console.error('[TransactionItem] Erro ao atualizar transação', error);
    }
  };

  const isCashWithdrawal = transaction.direction === "outcome";

  return (
    <>
      <div id={id}>
        <div className={styles.container}>
          <div>
            <p className={styles.title}>{capitalize(transaction.type)}</p>
            <p className={styles.date}>{formatDate(transaction.date)}</p>
            {transaction.attachment ? (
              <div className={styles.attachment}>
                <AttachFileIcon className={styles.icon} />
                <span className={styles.name}>
                  {transaction.attachment?.name}
                </span>
              </div>
            ) : null}
            <div className={styles.buttons}>
              <IconButton
                priority="tertiary"
                size="small"
                icon={<EditIcon />}
                onClick={() => {
                  handleModal();
                }}
              />
              <IconButton
                priority="tertiary"
                size="small"
                icon={<DeleteIcon />}
                onClick={async () => {
                  try {
                    await onDelete(transaction);
                  } catch (error) {
                    console.error(
                      '[TransactionItem] Erro ao remover transação',
                      error,
                    );
                  }
                }}
              />
            </div>
          </div>
          <div className={styles.rightColumn}>
            <p
              className={` ${isCashWithdrawal ? styles.isCashWithdrawal : ""} ${
                styles.value
              }`}
            >
              {transaction.formattedAmount()}
            </p>
          </div>
        </div>
        {hasDivider ? <Divider weight="bold" /> : null}
        <Modal
          isOpened={isOpen}
          handleModal={handleModal}
          onSave={handleSave}
          initialData={transaction}
        />
      </div>
    </>
  );
}
