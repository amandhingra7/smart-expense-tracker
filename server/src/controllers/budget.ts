import { AuthRequest } from "../middleware/auth";
import { Response } from "express";
import { prisma } from "../prisma";

export const getBudget = async (req: AuthRequest, res: Response) => {
  const month = req.query.month as string;
  const record = await prisma.budget.findUnique({
    where: { userId_month: { userId: req.user!.userId, month } },
  });
  res.json({ limit: record?.limit || null });
};

export const setBudget = async (req: AuthRequest, res: Response) => {
  const { month, limit } = req.body;
  await prisma.budget.upsert({
    where: { userId_month: { userId: req.user!.userId, month } },
    update: { limit },
    create: { user: { connect: { id: req.user!.userId } }, month, limit },
  });
  res.json({ success: true });
};
