import { Request, Response } from "express";
import xml from "xml";
import Book from "../models/book";

const generateBookResponse = (booksToSend: Book | Book[], req: Request, res: Response) => {
    const contentType: string | undefined = req.headers["content-type"]
    if (contentType === "application/json") {
        res.json(booksToSend);
    }
    else if (contentType === "text/xml") {
        res.set("Content-Type", "text/xml");
        res.send(xml(JSON.stringify(booksToSend)));
    }
    else {
        res.sendStatus(400);
    }
}

const getAllBooks = (req: Request, res: Response) => {
    const filteredBooks: Book[] = Book.filterBooksBy(req.query);
    generateBookResponse(filteredBooks, req, res);
}

const getBookDetail = (req: Request, res: Response) => {
    const book: Book | undefined = Book.getBookBy({ id: req.params.book_id });

    if (book == null) {
        res.sendStatus(404);
    }
    else {
        generateBookResponse(book, req, res);
    }

}

export { getAllBooks, getBookDetail };

