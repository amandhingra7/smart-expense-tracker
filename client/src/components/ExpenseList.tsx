import React, { useEffect, useState } from "react";
import API from "../api.ts";
import { Expense } from "../types/Expense";

export default function ExpenseList() {
  const [items, setItems] = useState<Expense[]>([]);
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7)); // default current month

  useEffect(() => {
    API.get("/expenses", { params: { month } })
      .then((r) => setItems(r.data))
      .catch(console.error);
  }, [month]);

  return (
    <div className="box">
      <h3>Expense History</h3>

      <div style={{ marginBottom: "10px" }}>
        <label>Select Month: </label>
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="input"
        />
      </div>

      {items.length === 0 ? (
        <p className="no-data">No expenses for this month.</p>
      ) : (
        items.map((e) => (
          <div key={e.id} className="expense-row">
            <div>{new Date(e.date).toLocaleDateString()}</div>
            <div>{e.description}</div>
            <div>₹{e.amount.toFixed(2)}</div>
            <div>{e.paymentMode}</div>
          </div>
        ))
      )}
    </div>
  );
}
