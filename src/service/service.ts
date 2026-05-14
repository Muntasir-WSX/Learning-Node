import path from "node:path";
import fs from "node:fs";

const filepath = path.join(process.cwd(), "./src/database/db.json");


export const readProduct = () => {
//   console.log("process.cwd() : ", process.cwd());
//   console.log("Filepath : ", filepath);


const products = fs.readFileSync(filepath, "utf-8");
console.log(products);
return JSON.parse(products);
}


export const insertProduct = (payload : any) => {
    fs.writeFileSync(filepath, JSON.stringify(payload));
}


// const data = readProduct();
// console.log("Data : ", data);
    // const newProduct = {
    //     id: 3,
    //     name: "Product 3",
    //     price: 300,
    //     description: "Description of Product 3"