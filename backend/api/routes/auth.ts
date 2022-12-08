import express from "express";
import dotenv from "dotenv";
import { authenticate } from "../controller/authController";

dotenv.config()

export const authRouter = express.Router()

authRouter.post('/authenticate', authenticate);