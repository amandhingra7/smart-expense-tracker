import { Router } from "express";
import { addExpense, getExpenses, getMonthlyTotal, getCategoryBreakdown, getDailyTrend, getPaymentModeBreakdown, getMonthlyTotals } from "../controllers/expenses";
import { authMiddleware } from "../middleware/auth";

const r = Router();

r.post("/", addExpense);
r.get("/", getExpenses);
r.get("/monthly", getMonthlyTotal);
r.get("/categories", getCategoryBreakdown);
r.get("/trend", getDailyTrend);
r.get("/paymentModes", getPaymentModeBreakdown);
r.get("/monthly-totals", getMonthlyTotals);



export default r;
