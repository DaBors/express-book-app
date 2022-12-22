import express, { Router } from "express";
import { authenticate } from "../controller/authController";

export const authRouter: Router = express.Router()

authRouter.post('/authenticate', authenticate);