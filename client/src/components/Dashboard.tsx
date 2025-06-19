import React, { useEffect, useState } from "react";
import API from "../api.ts";

export default function Dashboard() {
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [spent, setSpent] = useState(0);
  const [budget, setBudget] = useState("");

  useEffect(() => {
    // Fetch monthly spend and budget on month change
    API.get("/expenses/monthly", { params: { month } })
      .then(r => setSpent(r.data.total))
      .catch(() => setSpent(0));

    API.get("/budget", { params: { month } })
      .then(r => setBudget(r.data?.limit?.toString() || ""))
      .catch(() => setBudget(""));
  }, [month]);

  const saveBudget = () => {
    if (!budget || isNaN(parseFloat(budget))) return alert("Invalid budget");
    API.post("/budget", { month, limit: parseFloat(budget) })
      .then(() => alert("Budget saved"))
      .catch(() => alert("Failed to save budget"));
  };

  const percent = budget ? Math.min((spent / parseFloat(budget)) * 100, 100) : 0;

  return (
    <div className="box">
      <h3>Dashboard</h3>

      {/* Month Selector */}
      <input
        type="month"
        className="input"
        value={month}
        onChange={e => setMonth(e.target.value)}
        style={{ maxWidth: "200px", marginBottom: "10px" }}
      />

      <p>Spent: ₹{spent.toFixed(2)}</p>

      <div className="flex-row">
        <input
          className="input"
          type="number"
          value={budget}
          placeholder="Budget"
          onChange={e => setBudget(e.target.value)}
        />
        <button className="btn" onClick={saveBudget}>Save</button>
      </div>

      <div className="progress-bar">
        <div
          className={`progress-fill ${percent < 100 ? "green" : "red"}`}
          style={{ width: `${percent}%` }}
        ></div>
      </div>

      <p>{percent.toFixed(1)}% of budget used</p>
    </div>
  );
}
