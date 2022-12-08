import { v4 as uuidv4 } from "uuid";
import { books } from "../services/dataService";
import User from "./user";

export default class Book {

    id: string;
    title: string;
    description: string;
    author_id: string;
    author: string;
    coverImage: string;
    price: number;

    constructor(title: string, description: string, author: User, coverImage: string, price: number) {
        this.id = uuidv4();
        this.title = title;
        this.description = description;
        this.author_id = author.id;
        this.author = author.authorPseudonym;
        this.coverImage = coverImage;
        this.price = price;
    }

    /**
    * Returns a `Book` by one of its unique identifiers `id`, `author_id` and `title` pair
    *
    * @param id - The `id` of the book to look it up by
    * 
    * @returns The `Book` in case it is found by one of its id, returns `undefined` otherwise
    */
    static getBookBy({ id = "", author_id = "", title = "" }): Book | undefined {
        var book: Book | undefined;
        if (id) {
            book = books.find((book) => {
                return book.id === id;
            });

            return book;
        }
        else if (author_id && title) {
            book = books.find((book) => {
                return (book.author_id === author_id && book.title === title);
            });

            return book;
        }

        return undefined;
    }

    static filterBooksBy({ title = "", description = "", author = "", price = 0 }): Book[] {
        console.log(title)
        var booksToFilter: Book[] = Object.assign([], books);
        if (title) {
            booksToFilter = booksToFilter.filter(
                book => book.title === title
            )
        }
        console.log(booksToFilter)
        if (description) {
            booksToFilter = booksToFilter.filter(
                book => book.description === description
            )
        }
        if (author) {
            booksToFilter = booksToFilter.filter(
                book => book.author === author
            )
        }
        if (price) {
            booksToFilter = booksToFilter.filter(
                book => book.price === price
            )
        }

        return booksToFilter;
    }

}
