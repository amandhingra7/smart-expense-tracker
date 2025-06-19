import { AuthRequest } from "../middleware/auth";
import { Response } from "express";
import { prisma } from "../prisma";
import axios from "axios";

export const addExpense = async (req: AuthRequest, res: Response) => {
  const { amount, date, paymentMode, description } = req.body;
  let tag = "Uncategorized";

  try {
    const response = await axios.post("http://localhost:5000/tag", { description });
    tag = response.data.category;
  } catch (err: unknown) {
    console.error("AI tagging failed:", err instanceof Error ? err.message : err);
  }

  const expense = await prisma.expense.create({
    data: {
      amount,
      date: new Date(date),
      paymentMode,
      description,
      category: tag,
      user: { connect: { id: req.user!.userId } },
    },
  });

  res.json(expense);
};

export const getExpenses = async (req: AuthRequest, res: Response) => {
  const month = req.query.month as string; // e.g., "2025-06"
  const userId = req.user!.userId;

  const where: any = { userId };

  if (month) {
    const [year, mon] = month.split("-");
    const start = new Date(Number(year), Number(mon) - 1, 1);
    const end = new Date(Number(year), Number(mon), 1);
    where.date = {
      gte: start,
      lt: end,
    };
  }

  const list = await prisma.expense.findMany({
    where,
    orderBy: { date: "desc" },
  });

  res.json(list);
};

export const getMonthlyTotal = async (req: AuthRequest, res: Response) => {
  const month = req.query.month as string;
  const start = new Date(`${month}-01`);
  const end = new Date(start);
  end.setMonth(end.getMonth() + 1);

  const sum = await prisma.expense.aggregate({
    where: { userId: req.user!.userId, date: { gte: start, lt: end } },
    _sum: { amount: true },
  });

  res.json({ total: sum._sum.amount ?? 0 });
};

export const getCategoryBreakdown = async (req: AuthRequest, res: Response) => {
  const month = req.query.month as string;
  const start = new Date(`${month}-01`);
  const end = new Date(start);
  end.setMonth(end.getMonth() + 1);

  const raw = await prisma.$queryRaw<
    { category: string; total: number }[]
  >`SELECT category, SUM(amount) as total FROM "Expense" WHERE "userId" = ${req.user!.userId} AND date >= ${start} AND date < ${end} GROUP BY description`;

  res.json(raw);
};

export const getDailyTrend = async (req: AuthRequest, res: Response) => {
  const month = req.query.month as string;
  const start = new Date(`${month}-01`);
  const end = new Date(start);
  end.setMonth(end.getMonth() + 1);

  const trends = await prisma.$queryRaw<
    { date: string; total: number }[]
  >`SELECT DATE(date) as date, SUM(amount) as total FROM "Expense" WHERE "userId" = ${req.user!.userId} AND date >= ${start} AND date < ${end} GROUP BY DATE(date) ORDER BY DATE(date)`;

  res.json(trends);
};

export const getPaymentModeBreakdown = async (req: AuthRequest, res: Response) => {
  const month = req.query.month as string;
  const start = new Date(`${month}-01`);
  const end = new Date(start); end.setMonth(end.getMonth() + 1);

  const result = await prisma.$queryRaw<
    { paymentMode: string, total: number }[]
  >`SELECT "paymentMode", SUM("amount") AS total FROM "Expense" WHERE "userId" = ${req.user?.userId} AND "date" >= ${start} AND "date" < ${end} GROUP BY "paymentMode"`;

  res.json(result);
};

export const getMonthlyTotals = async (req: AuthRequest, res: Response) => {
  const totals = await prisma.$queryRaw<
    { month: string; total: number }[]
  >`SELECT TO_CHAR(date, 'YYYY-MM') as month, SUM(amount) as total
    FROM "Expense"
    WHERE "userId" = ${req.user?.userId}
    GROUP BY TO_CHAR(date, 'YYYY-MM')
    ORDER BY month`;

  res.json(totals);
};