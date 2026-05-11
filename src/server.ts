import { createServer, IncomingMessage, Server, ServerResponse } from "http";
import { routeHandler } from "./routes/routes";

const server: Server = createServer((req : IncomingMessage , res:ServerResponse) => {
  routeHandler(req, res);
});

server.listen(3000, () => {
    console.log("Server is listening on port 3000");
});