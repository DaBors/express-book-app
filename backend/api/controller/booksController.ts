import { Request, Response } from "express";
import Book from "../models/book";
import generateResponse from "./responseController";

/**
* Returns the details of the list of books that are matching the filters provided in the request query parameters
*
* @param request - The request express object 
* @param response - The response express object 
* 
*/
const getAllBooks = (request: Request, response: Response) => {
    const filteredBooks: Book[] = Book.filterBooksBy(request.query);
    generateResponse(200, filteredBooks, request, response);
}

/**
* Returns the details of a book identified by its id if found, 404 otherwise
*
* @param request - The request express object 
* @param response - The response express object 
* 
*/
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

