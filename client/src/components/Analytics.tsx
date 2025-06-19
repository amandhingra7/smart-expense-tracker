import React, { useEffect, useState } from "react";
import API from "../api.ts";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

interface PaymentModeData {
  paymentMode: string;
  total: number;
}

interface Trend {
  date: string;  // e.g. "2025-06-01"
  total: number;
}

export default function Analytics() {
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [modes, setModes] = useState<PaymentModeData[]>([]);
  const [trend, setTrend] = useState<Trend[]>([]);

  useEffect(() => {
    API.get("/expenses/paymentModes", { params: { month } })
      .then((r) => setModes(r.data))
      .catch(() => setModes([]));

    API.get("/expenses/trend", { params: { month } })
      .then((r) => setTrend(r.data))
      .catch(() => setTrend([]));
  }, [month]);

  const pieData = {
    labels: modes.map((m) => m.paymentMode),
    datasets: [
      {
        data: modes.map((m) => m.total),
        backgroundColor: ["#4CAF50", "#FF9800", "#03A9F4", "#E91E63", "#9C27B0"],
      },
    ],
  };

  const lineData = {
    labels: trend.map((t) =>
      new Date(t.date).toLocaleDateString(undefined, { day: "numeric", month: "short" })
    ),
    datasets: [
      {
        label: "Daily Spend",
        data: trend.map((t) => t.total),
        borderColor: "#36a2eb",
        fill: true,
        tension: 0.3,
        backgroundColor: "rgba(54, 162, 235, 0.1)",
      },
    ],
  };

  if (modes.length === 0 && trend.length === 0) {
    return (
      <div className="box">
        <p className="no-data">No analytics data available.</p>
      </div>
    );
  }

  return (
    <div className="box">
      <h3>Analytics</h3>

      {/* Month Selector */}
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <label>
          <strong>Select Month:</strong>{" "}
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="input"
            style={{ maxWidth: "200px" }}
          />
        </label>
      </div>

      <div className="chart-row">
        <div className="chart-box">
          <h4 style={{ textAlign: "center" }}>Spending by Payment Mode</h4>
          <Pie data={pieData} />
        </div>
        <div className="chart-box">
          <h4 style={{ textAlign: "center" }}>Daily Spending Trend</h4>
          <Line data={lineData} />
        </div>
      </div>
    </div>
  );
}
