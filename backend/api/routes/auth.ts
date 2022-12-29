import express, { Router } from "express";
import { handleAuthenticateUser } from "../controller/authController";

export const authRouter: Router = express.Router()

authRouter.post('/authenticate', handleAuthenticateUser);