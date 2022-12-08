import * as fs from "fs";
import User from "../models/user";
import development_data from "../database/development_users.json";
import test_data from "../database/test_users.json";
import Book from "../models/book";

class DataService {

    /**
    * Deletes all current users and overwrites the db
    */
    static deleteAllUsers() {
        users = []
        fs.writeFileSync(`./backend/api/database/${process.env.NODE_ENV}_users.json`, JSON.stringify(users, null, 2), "utf-8");
    }

    /**
    * Saves a `User` in the db in case the username doesn't already exists
    *
    * @param user - The `user` object to be saved
    * 
    * @returns `true` if the user was successfully saved, returns `false` otherwise
    */
    static saveUser(user: User): boolean {
        if (User.getUserBy({ username: user.username }) === undefined) {
            users.push(user)
            fs.writeFileSync(`./backend/api/database/${process.env.NODE_ENV}_users.json`, JSON.stringify(users, null, 2), "utf-8");

            return true;
        }

        return false;
    }

    /**
    * Returns all the users stored in the db corresponding to the current environment
    * 
    * @returns `User` array that holds the data of the users stored in the db
    */
    static loadAllUsers(): User[] {
        switch (process.env.NODE_ENV) {
            case "development": {
                return development_data as User[];
            }
            case "test": {
                return test_data as User[];
            }
            default: {
                return []
            }
        }

    }

    /**
    * Deletes all current books and overwrites the db
    */
    static deleteAllBooks() {}

    /**
    * Saves a `Book` in the db in case the same author didn't publish a book with the same title
    *
    * @param book - The `book` object to be saved
    * 
    * @returns `true` if the book was successfully saved, returns `false` otherwise
    */
    static saveBook(book: Book): boolean {
        return false;
    }

    /**
    * Returns all the books stored in the db corresponding to the current environment
    * 
    * @returns `Book` array that holds the data of the books stored in the db
    */
    static loadAllBooks(): Book[] {
        return []
    }

}

/**
* Stores all the `User` objects in the current environment
*/
var users: User[] = DataService.loadAllUsers();

/**
* Stores all the `Book` objects in the current environment
*/
var books: Book[] = DataService.loadAllBooks();

export { users, books, DataService };