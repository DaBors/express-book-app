import express from "express";
import cors from "cors";

import debug from "debug";
import morgan from "morgan";

import dotenv from "dotenv";

import { booksRouter } from "./api/routes/booksRoutes";
import { authRouter } from "./api/routes/auth";

dotenv.config()

const app: express.Application = express();

const port: string = process.env.PORT || "3000";

const debugLog: debug.IDebugger = debug("app");

app.use(express.json());

app.use(cors());

app.use(morgan("dev"));

app.get("/", (_: express.Request, response: express.Response) => {
    response.status(200).send(`Server is running at http://localhost:${port}`)
});

app.use("/books", booksRouter);
app.use("/auth", authRouter);


export { app };