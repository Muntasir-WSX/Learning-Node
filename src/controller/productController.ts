import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProduct } from "../service/service";
import type { Iproduct } from "../types/product.type";
import { parseBody } from "../utilitis/parseBody";
import { sendResponse } from "../utilitis/sendResponse";

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

       sendResponse(res, 200, true, "Products retrieved successfully", products
       );
    }

    else if (method === "GET" && id !== null) {

const products = readProduct();
const product = products.find((p: Iproduct) => p.id === id);
console.log("product : ", product);
    }

    else if (method === "POST" && url === "/products" )
        
    {
        const body = await parseBody(req);
        const products = readProduct();

        const newProduct = {
            id : Date.now(),
            ...body
        }; console.log("newProduct : ", newProduct);

        products.push(newProduct);
        console.log("products : ", products);
        insertProduct(products);
        console.log("body : ", body);
        sendResponse(res, 201, true, "Product created successfully", newProduct);
    }


    else if(method === "PUT" && id !== null) {

        const body = await parseBody(req);
        const products = readProduct();
        const productIndex = products.findIndex((p: Iproduct) => p.id === id);
        console.log("productIndex : ", productIndex);
 if (productIndex !== -1) {
    sendResponse(res, 404, false, "Product not found");
    return;
 }

 products [productIndex] = { id: products[productIndex].id, ...body };
 sendResponse(res, 200, true, "Product updated successfully", products[productIndex]);
}

else if (method === "DELETE" && id !== null) {

    const products = readProduct();
    const productIndex = products.findIndex((p: Iproduct) => p.id === id);
    console.log("productIndex : ", productIndex);
    if (productIndex === -1) {
                sendResponse(res, 404, false, "Product not found");
                return;
    }

    const deletedProduct = products.splice(productIndex, 1);
    insertProduct(products);
    sendResponse(res, 200, true, "Product deleted successfully", deletedProduct[0]);
    // res.end(JSON.stringify({ message: "Product deleted successfully", data: deletedProduct[0] }))
}

};