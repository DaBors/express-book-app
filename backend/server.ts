import http from "http";
import { app } from "./app";

const server: http.Server = http.createServer(app);
const port: string = process.env.PORT || "3000";

server.listen(port);

export { server };