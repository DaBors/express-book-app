import { v4 as uuidv4 } from "uuid";
import { books } from "../services/dataService";
import User from "./user";

export default class Book {

    id: string;
    title: string;
    description: string;
    author_id: string;
    coverImage: string;
    price: number;

    constructor(title: string, description: string, author: User, coverImage: string, price: number) {
        this.id = uuidv4();
        this.title = title;
        this.description = description;
        this.author_id = author.id;
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
    static getBookBy({ id = "", author_id = "", title = ""}): Book | undefined {
        return undefined;
    }

}
