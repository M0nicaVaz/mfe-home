"use client";

import { Bar, Line, Doughnut } from "react-chartjs-2";
import { Transaction } from "@/models/Transaction";
import { ChartListItem } from "@/models/ChartListItem";
import styles from "./styles.module.scss";

type DashboardProps = {
  transactions: Transaction[];
  order: ChartListItem[];
};

export default function Dashboard({ transactions, order }: DashboardProps) {
  // === Preparar dados dos gráficos ===
  const typeCounts = transactions.reduce<Record<string, number>>((acc, t) => {
    acc[t.type] = (acc[t.type] || 0) + 1;
    return acc;
  }, {});

  const typeData = {
    labels: Object.keys(typeCounts),
    datasets: [
      {
        data: Object.values(typeCounts),
        backgroundColor: [
          "#ab80fa",
          "#736be0",
          "#fdc046",
          "#fe9084",
          "#e38ddc",
          "#424682",
        ],
      },
    ],
  };

  const sorted = [...transactions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  let balance = 0;
  const cumulative = sorted.map((t) => {
    balance += t.direction === "income" ? t.amount : -t.amount;
    return { date: t.date, balance };
  });

  const lineData = {
    labels: cumulative.map((c) => new Date(c.date).toLocaleDateString("pt-BR")),
    datasets: [
      {
        label: "Saldo acumulado",
        data: cumulative.map((c) => c.balance),
        borderColor: "#ab80fa",
        backgroundColor: "rgba(171, 128, 250, 0.2)",
        fill: true,
      },
    ],
  };

  const monthly = transactions.reduce<
    Record<string, { income: number; outcome: number }>
  >((acc, t) => {
    const month = new Date(t.date).toLocaleDateString("pt-BR", {
      month: "short",
      year: "numeric",
    });
    if (!acc[month]) acc[month] = { income: 0, outcome: 0 };
    acc[month][t.direction] += t.amount;
    return acc;
  }, {});

  const barData = {
    labels: Object.keys(monthly),
    datasets: [
      {
        label: "Receitas",
        data: Object.values(monthly).map((m) => m.income),
        backgroundColor: "#ab80fa",
      },
      {
        label: "Despesas",
        data: Object.values(monthly).map((m) => m.outcome),
        backgroundColor: "#fe9084",
      },
    ],
  };

  const clientTotals = transactions.reduce<Record<string, number>>((acc, t) => {
    acc[t.clientId] = (acc[t.clientId] || 0) + t.amount;
    return acc;
  }, {});

  const clientData = {
    labels: Object.keys(clientTotals),
    datasets: [
      {
        label: "Total movimentado",
        data: Object.values(clientTotals),
        backgroundColor: "#ab80fa",
      },
    ],
  };

  // === Função para gerar descrição textual dos gráficos ===
  const generateChartDescription = (id: number) => {
    switch (id) {
      case 1:
        return `Tipos de transações: ${typeData.labels
          .map((label, i) => `${label}: ${typeData.datasets[0].data[i]}`)
          .join(", ")}`;
      case 2:
        return `Saldo acumulado ao longo do tempo: ${lineData.labels
          .map((date, i) => `${date}: ${lineData.datasets[0].data[i]}`)
          .join(", ")}`;
      case 3:
        return `Receitas e despesas por mês: ${barData.labels
          .map(
            (month, i) =>
              `${month}: Receitas ${barData.datasets[0].data[i]}, Despesas ${barData.datasets[1].data[i]}`
          )
          .join(", ")}`;
      case 4:
        return `Total movimentado por cliente: ${clientData.labels
          .map((client, i) => `${client}: ${clientData.datasets[0].data[i]}`)
          .join(", ")}`;
      default:
        return "";
    }
  };

  const charts: Record<number, React.ReactNode> = {
    1: (
      <Doughnut
        data={typeData}
        options={{ maintainAspectRatio: false }}
        aria-hidden="true"
      />
    ),
    2: (
      <Line
        data={lineData}
        options={{ maintainAspectRatio: false }}
        aria-hidden="true"
      />
    ),
    3: (
      <Bar
        data={barData}
        options={{ maintainAspectRatio: false }}
        aria-hidden="true"
      />
    ),
    4: (
      <Bar
        data={clientData}
        options={{ indexAxis: "y", maintainAspectRatio: false }}
        aria-hidden="true"
      />
    ),
  };

  return (
    <div className={styles.dashboard}>
      {order.map((item) => (
        <div key={item.id} className={styles.card} tabIndex={0}>
          {/* Título do gráfico */}
          <h2>{item.label}</h2>

          {/* Gráfico visual */}
          {charts[item.id]}

          {/* Texto alternativo para leitores de tela */}
          <div className={styles.srOnly}>
            {generateChartDescription(item.id)}
          </div>
        </div>
      ))}
    </div>
  );
}
