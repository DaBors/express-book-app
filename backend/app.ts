import express from "express";
import cors from "cors";

import debug from "debug";
import morgan from "morgan";

import { booksRouter } from "./api/routes/booksRoutes";
import { authRouter } from "./api/routes/auth";

const app: express.Application = express();

const port: string = process.env.PORT || "3000";

const debugLog: debug.IDebugger = debug("app");

app.use(express.json());

app.use(cors());

app.use(morgan("dev"));

app.get("/", (_: express.Request, res: express.Response) => {
    res.status(200).send(`Server is running at http://localhost:${port}`)
});

app.use("/books", booksRouter);
app.use("/auth", authRouter);


export { app };