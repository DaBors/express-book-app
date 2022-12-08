import { Request, Response } from "express";
import xml from "xml";
import Book from "../models/book";

const getAllBooks = (req: Request, res: Response) => {
    const filteredBooks: Book[] = Book.filterBooksBy(req.query)
    const contentType: string | undefined = req.headers["content-type"]
    if (contentType === "application/json") {
        
        res.json(filteredBooks);
    }
    else if (contentType === "text/xml") {
        res.set("Content-Type", "text/xml");
        res.send(xml(JSON.stringify(filteredBooks)));
    }
    else {
        res.sendStatus(400);
    }
}

export { getAllBooks };