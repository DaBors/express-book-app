import express from "express";
import { authenticate } from "../controller/authController";

export const authRouter = express.Router()

authRouter.post('/authenticate', authenticate);