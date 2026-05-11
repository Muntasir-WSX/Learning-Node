import { createServer, IncomingMessage, Server, ServerResponse } from "http";

const server: Server = createServer((req : IncomingMessage , res:ServerResponse) => {
    // console.log(req.url); // '/', '/user', '/products'
    // console.log(req.method); // 'GET', 'POST', 'PUT', 'DELETE'

    const url = req.url;
    const method = req.method;
    if (url === "/" && method === "GET") {
        // console.log("This is root route");
        res.writeHead(200,{"content-type" : "application/json"})
        res.end(JSON.stringify({ message: "Welcome to the root route" }));
    }

    else if (url?.startsWith("products"))
    {
        res.writeHead(200,{"content-type" : "application/json"})
        res.end(JSON.stringify({ message: "Welcome to the products route" }));
    }

    else  {

        res.writeHead(404, {"content-type" : "application/json"})
        res.end(JSON.stringify({ error: "Page not found" }));
    }

});

server.listen(3000, () => {
    console.log("Server is listening on port 3000");
});