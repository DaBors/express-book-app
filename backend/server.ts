import express from "express";
import http from "http";
import cors from "cors";

import debug from "debug";
import morgan from "morgan";

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port: string = process.env.PORT || "3000";

const debugLog: debug.IDebugger = debug("app");

app.use(express.json());

app.use(cors());

app.use(morgan("dev"));

app.get("/", (_: express.Request, res: express.Response) => {
    res.status(200).send(`Server is running at http://localhost:${port}`)
});

server.listen(port);

export { server, app };