import { stat } from "fs";
import type { ServerResponse } from "http";

export const sendResponse = ( res: ServerResponse, status:number, success: boolean, message: string, data?:any ) => {

const response = {
    status : success ? "success" : "error",
    message : message,
    data : data
}

    res.writeHead(200,{"content-type" : "application/json"});
    res.end(JSON.stringify(response))




}