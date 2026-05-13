import type { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../service/service";
import type { Iproduct } from "../types/product.type";
import { parseBody } from "../utilitis/parseBody";

export const producController = async (req:IncomingMessage, res:ServerResponse) => {

        const url = req.url;
    const method = req.method;

    const urlParts = url?.split("/")
    const id = urlParts && urlParts[1] === 'products' ? Number(urlParts[2]) : null; 
    // console.log("urlParts : ", urlParts);
    // console.log("id : ", id);
    // single products
    // Get all products

    if (url === "/products" && method === "GET")
        {  


            // const products = [
            //     {
            //         id : 1,
            //         name : "Product 1",
            //         price : 10
            //     }
            // ]
            const products = readProduct();





            res.writeHead(200,{"content-type" : "application/json"});
            res.end(JSON.stringify({ message: "Products retrieved successfully", data: products,
            // data: [
            //     { id: 1, name: "Product 1", price: 10 },
            //     { id: 2, name: "Product 2", price: 20 },
            //     { id: 3, name: "Product 3", price: 30 }
            // ],
        })
    )
    
    }

    else if (method === "GET" && id !== null) {

const products = readProduct();
const product = products.find((p: Iproduct) => p.id === id);
console.log("product : ", product);
    }

    else if (method === "POST" && url === "/products" )
        
    {
        const body = await parseBody(req);
        console.log("body : ", body);
        res.writeHead(201,{"content-type" : "application/json"});
        res.end(JSON.stringify({ message: "Product created successfully",
            //  data: product 
            
            }))
    }


};