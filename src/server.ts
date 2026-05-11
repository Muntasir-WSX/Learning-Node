import { createServer, IncomingMessage, Server } from "http";

const server: Server = createServer((req : IncomingMessage , res) => {
    console.log(req);
});

server.listen(3000, () => {
    console.log("Server is listening on port 3000");
});