import Book from "../../../backend/api/models/book";
import User from "../../../backend/api/models/user";
import { users, books, DataService } from "../../../backend/api/services/dataService";

describe("Testing data service user functionalities", () => {

    afterEach(async () => {
        /**
         * Delete users from test db
         */
        DataService.deleteAllUsers();
    })

    it("can store new user", async () => {
        const masha: User = new User("Masha", "NotMasha", "DefinitelyNotMasha");
        DataService.saveUser(masha);

        expect(1).toEqual(users.length);
    });

    it("can delete all users", async () => {
        const masha: User= new User("Masha", "NotMasha", "DefinitelyNotMasha");
        DataService.saveUser(masha);

        DataService.deleteAllUsers();
        expect(0).toEqual(users.length);
    });

});

describe("Testing data service book functionalities", () => {

    afterEach(async () => {
        /**
         * Delete users and books from test db
         */
        DataService.deleteAllBooks();
        DataService.deleteAllUsers();
    })

    it("can store new book", async () => {
        const masha: User = new User("Masha", "NotMasha", "DefinitelyNotMasha");
        const mashasBook: Book = new Book("Title", "Description", masha, "https://example.com", 200);
        DataService.saveUser(masha);
        DataService.saveBook(mashasBook);

        expect(1).toEqual(books.length);
    });

    it("can delete all books", async () => {
        const masha: User = new User("Masha", "NotMasha", "DefinitelyNotMasha");
        const mashasBook: Book = new Book("Title", "Description", masha, "https://example.com", 200);
        DataService.saveUser(masha);
        DataService.saveBook(mashasBook);

        DataService.deleteAllBooks();
        expect(0).toEqual(books.length);
    });

});
