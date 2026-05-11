import type { IncomingMessage, ServerResponse } from "http";
import { producController } from "../controller/productController";

export const routeHandler = (req:IncomingMessage, res:ServerResponse) =>
{
      // console.log(req.url); // '/', '/user', '/products'
    // console.log(req.method); // 'GET', 'POST', 'PUT', 'DELETE'

    const url = req.url;
    const method = req.method;
    if (url === "/" && method === "GET") {
        // console.log("This is root route");
        res.writeHead(200,{"content-type" : "application/json"})
        res.end(JSON.stringify({ message: "Welcome to the root route" }));
    }

    else if (url === ("/products") && method === "GET")
    {
        producController(req, res);
    }

    else  {

        res.writeHead(404, {"content-type" : "application/json"})
        res.end(JSON.stringify({ error: "Page not found" }));
    }
}