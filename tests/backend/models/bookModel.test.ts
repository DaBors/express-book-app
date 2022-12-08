import Book from "../../../backend/api/models/book";
import User from "../../../backend/api/models/user";
import { DataService } from "../../../backend/api/services/dataService";

describe("Testing book model functionalities", () => {

    afterEach(async () => {
        /**
         * Delete users and books from test db
         */
        DataService.deleteAllBooks();
        DataService.deleteAllUsers();
    })

    xit("can find book", async () => {
        const masha = new User("Masha", "NotMasha", "DefinitelyNotMasha");
        const mashasBook = new Book("Title", "Description", masha, "https://example.com", 200);
        DataService.saveUser(masha);
        DataService.saveBook(mashasBook)

        expect(Book.getBookBy({ id: mashasBook.id })).toEqual(mashasBook);
        expect(Book.getBookBy({ title: mashasBook.title, author_id: masha.id })).toEqual(mashasBook);
    });

    xit("cannot find book that doesn't exists", async () => {
        const masha = new User("Masha", "NotMasha", "DefinitelyNotMasha");
        const mashasBook = new Book("Title", "Description", masha, "https://example.com", 200);
        DataService.saveUser(masha);
        DataService.saveBook(mashasBook)

        expect(Book.getBookBy({ id: "notExistingId" })).toEqual(undefined);
    });

});
