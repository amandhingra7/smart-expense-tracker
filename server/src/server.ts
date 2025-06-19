import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth";
import expenseRouter from "./routes/expenses";
import budgetRouter from "./routes/budget";
import { authMiddleware } from "./middleware/auth";

dotenv.config();

const app = express();
app.use(cors(), express.json());
app.use("/auth", authRouter);
app.use(authMiddleware as express.RequestHandler);

app.use("/expenses", expenseRouter);
app.use("/budget", budgetRouter);

const PORT = +process.env.PORT! || 4000;
app.listen(PORT, () => console.log(`Backend ▶️ http://localhost:${PORT}`));
