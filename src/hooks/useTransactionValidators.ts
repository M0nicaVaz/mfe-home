import { useState, useEffect } from "react";
import { TransactionType } from "@/models/Transaction";

const validateAmount = (amount: number): string | null => {
  if (amount <= 0) {
    return "O valor deve ser maior que 0.";
  }

  if (amount > 50000) {
    return "⚠️ Valor alto detectado. Confirme se está correto.";
  }

  return null;
};

interface UseTransactionValidators {
  initialType?: TransactionType;
  initialAmount?: number;
}

export function useTransactionValidators({
  initialType = "depósito",
  initialAmount = 0,
}: UseTransactionValidators = {}) {
  const [type, setType] = useState<TransactionType>(initialType);
  const [amount, setAmount] = useState<number>(initialAmount);
  const [amountError, setAmountError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  // Validar em tempo real
  useEffect(() => {
    if (touched) {
      const error = validateAmount(amount);
      setAmountError(error);
    }
  }, [amount, touched]);

  // Verificar se é um erro bloqueante
  const hasBlockingError = amountError && !amountError.includes("⚠️");
  const isFormValid = amount > 0 && type && !hasBlockingError;
  const showInputError = hasBlockingError && touched;

  const handleAmountChange = (newAmount: number) => {
    setAmount(newAmount);
    setTouched(true);
  };

  const handleTypeChange = (newType: TransactionType) => {
    setType(newType);
  };

  const resetForm = () => {
    setAmount(0);
    setType("depósito");
    setAmountError(null);
    setTouched(false);
  };

  const validateBeforeSubmit = (): boolean => {
    setTouched(true);
    const error = validateAmount(amount);

    if (error && !error.includes("⚠️")) {
      setAmountError(error);
      return false;
    }

    if (!type) {
      return false;
    }

    return true;
  };

  return {
    // Estados
    type,
    amount,
    amountError,
    touched,

    // Flags
    isFormValid,
    showInputError,
    hasBlockingError,

    // Handlers
    handleAmountChange,
    handleTypeChange,
    resetForm,
    validateBeforeSubmit,

    // Setters diretos
    setType,
    setAmount,
    setTouched,
  };
}
