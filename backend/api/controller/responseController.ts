import { Request, Response } from "express";
import xml from "xml";

const generateResponse = (respCode: number, respInfo: Object, req: Request, res: Response) => {
    const contentType: string | undefined = req.headers["content-type"]
    if (contentType === "application/json") {
        res.status(respCode).json(respInfo);
    }
    else if (contentType === "text/xml") {
        res.set("Content-Type", "text/xml");
        res.status(respCode).send(xml(JSON.stringify(respInfo)));
    }
    else {
        res.sendStatus(400);
    }
}

export default generateResponse;