import { Request, Response } from "express";
import xml from "xml";

const generateResponse = (responseCode: number, responseInfo: Object, req: Request, response: Response) => {
    const contentType: string | undefined = req.headers["content-type"]
    if (contentType === "application/json") {
        response.status(responseCode).json(responseInfo);
    }
    else if (contentType === "text/xml") {
        response.set("Content-Type", "text/xml");
        response.status(responseCode).send(xml(JSON.stringify(responseInfo)));
    }
    else {
        response.sendStatus(400);
    }
}

export default generateResponse;