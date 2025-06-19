import { Router } from "express";
import { register, login } from "../controllers/auth";
import * as express from "express";


const r = Router();

r.post("/register", register as express.RequestHandler);
r.post("/login", login as express.RequestHandler);

export default r;
