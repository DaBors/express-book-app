import request from "supertest";
import xml from "xml";
import Book from "../../../backend/api/models/book";
import User from "../../../backend/api/models/user";
import { DataService } from "../../../backend/api/services/dataService";
import { server } from "../../../backend/server";

describe("Test all book api endpoints", () => {
    const masha = new User("Masha", "NotMasha", "DefinitelyNotMasha");
    const mashasBook = new Book("Title", "Description", masha, "https://example.com", 200);

    beforeAll(async () => {
        DataService.saveUser(masha);
        DataService.saveBook(mashasBook);
    })

    afterAll(async () => {
        /**
         * Close the server instance after each test
         */
        DataService.deleteAllBooks();
        DataService.deleteAllUsers();
        await server.close()
    })


    xit("get all books", async () => {
        const resJson = await request(server).get("/books").set("Content-Type", "application/json");
        expect(resJson.statusCode).toBe(200);
        expect(resJson.body as Book).toEqual([mashasBook])

        const resXml= await request(server).get("/books").set("Content-Type", "text/xml");
        expect(resXml.statusCode).toBe(200);
        expect(resXml.body as Book).toEqual(xml(JSON.stringify([mashasBook])))
    });

});
