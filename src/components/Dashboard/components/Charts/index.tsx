"use client";

import { Bar, Line, Doughnut } from "react-chartjs-2";
import { Transaction } from "@/models/Transaction";
import { ChartListItem } from "@/models/ChartListItem";
import styles from "./styles.module.scss";

type DashboardProps = {
  transactions: Transaction[];
  order: ChartListItem[];
};

const Dashboard = ({ transactions, order }: DashboardProps) => {
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
    labels: cumulative.map((c) =>
      new Date(c.date).toLocaleDateString("pt-BR")
    ),
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

  const attachmentCounts = transactions.reduce<Record<string, number>>(
    (acc, t: Transaction) => {
      const key = t.attachment ? "Com Anexo" : "Sem Anexo";
      acc[key] = (acc[key] || 0) + 1;
      
      return acc;
    },
    { "Com Anexo": 0, "Sem Anexo": 0 }
  );
  const attachmentData = {
  labels: Object.keys(attachmentCounts),
  datasets: [
    {
      label: "Total movimentado",
      data: Object.values(attachmentCounts),
      backgroundColor: "#ab80fa",
    },
  ],
};

  const charts: Record<number, React.JSX.Element> = {
    1: <Doughnut data={typeData} options={{ maintainAspectRatio: false }} />,
    2: <Line data={lineData} options={{ maintainAspectRatio: false }} />,
    3: <Bar data={barData} options={{ maintainAspectRatio: false }} />,
    4: (
      <Bar
        data={attachmentData}
        options={{
          indexAxis: "y",
          maintainAspectRatio: false,
          scales: {
            x: {
              ticks: {
                precision: 0
              }
            }
          }
        }}
        
      />
    ),
  };

  return (
    <div className={styles.dashboard}>
      {order.map((item) => (
        <div key={item.id} className={styles.card}>
          <h2>{item.label}</h2>
          {charts[item.id]}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
