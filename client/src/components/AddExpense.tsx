import React, { useState } from "react";
import API from "../api.ts";

export default function AddExpense() {
  const [paymentMode, setPaymentMode] = useState("");
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState(""); // 


  const handleAdd = () => {
    if (!amount || !desc || !paymentMode) return alert("Enter all details");

    API.post("/expenses", {
      amount: parseFloat(amount),
      description: desc,
      paymentMode,
      date: new Date(date).toISOString()
    })
      .then(() => alert("Added"))
      .catch(() => alert("Failed"));

    setAmount("");
    setDesc("");
    setPaymentMode("");
    setDate("")
  };

  return (
    <div className="add-expense-box">
      <h2>Add Expense</h2>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <input
  className="input"
  type="date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
/>

      <select
        value={paymentMode}
        onChange={(e) => setPaymentMode(e.target.value)}
      >
        <option value="">Select Payment Mode</option>
        <option value="Cash">Cash</option>
        <option value="Card">Card</option>
        <option value="UPI">UPI</option>
      </select>
      <button onClick={handleAdd}>Add Expense</button>
    </div>
  );
}
