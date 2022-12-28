import { Request, Response } from "express";
import Book from "../models/book";
import generateResponse from "./responseController";


const getAllBooks = (request: Request, response: Response) => {
    const filteredBooks: Book[] = Book.filterBooksBy(request.query);
    generateResponse(200, filteredBooks, request, response);
}

const getBookDetail = (request: Request, response: Response) => {
    const book: Book | undefined = Book.getBookBy({ id: request.params.book_id });

    if (book == null) {
        response.sendStatus(404);
    }
    else {
        generateResponse(200, book, request, response);
    }

}

export { getAllBooks, getBookDetail };

