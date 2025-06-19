import express from "express";
import cors from "cors";
import authRouter from "./routes/auth";
import expenseRouter from "./routes/expenses";
import budgetRouter from "./routes/budget";
import { authMiddleware } from "./middleware/auth";
import { Router } from "express";

const app = express();
app.use(cors(), express.json());
app.use("/auth", authRouter);
app.use(authMiddleware);
app.use("/expenses", expenseRouter);
app.use("/budget", budgetRouter);
export default app;
