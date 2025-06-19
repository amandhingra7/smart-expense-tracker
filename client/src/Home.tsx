import React from "react";
import Dashboard from "./components/Dashboard.tsx";
import AddExpense from "./components/AddExpense.tsx";
import Analytics from "./components/Analytics.tsx";
import ExpenseList from "./components/ExpenseList.tsx";

export default function Home() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="container">
      {/* 🔰 Header with logo and title */}
      <header className="app-header">
        <div className="logo-title">
          <h1 className="app-title">Smart Expense Tracker</h1>
        </div>
        <div className="logout-container">
          <button className="btn btn-red" onClick={logout}>Logout</button>
        </div>
      </header>

      <Dashboard />
      <AddExpense />
      <Analytics />
      <ExpenseList />
    </div>
  );
}
