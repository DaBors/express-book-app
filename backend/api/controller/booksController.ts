import { Request, Response } from "express";
import Book from "../models/book";
import generateResponse from "./responseController";


const getAllBooks = (req: Request, res: Response) => {
    const filteredBooks: Book[] = Book.filterBooksBy(req.query);
    generateResponse(200, filteredBooks, req, res);
}

const getBookDetail = (req: Request, res: Response) => {
    const book: Book | undefined = Book.getBookBy({ id: req.params.book_id });

    if (book == null) {
        res.sendStatus(404);
    }
    else {
        generateResponse(200, book, req, res);
    }

}

export { getAllBooks, getBookDetail };

