import { Router } from "express";
import { getBudget, setBudget } from "../controllers/budget";

const r = Router();

r.get("/", getBudget);
r.post("/", setBudget);

export default r;
