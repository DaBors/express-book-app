import request from "supertest";
import xml from "xml";
import Book from "../../../backend/api/models/book";
import User from "../../../backend/api/models/user";
import { DataService } from "../../../backend/api/services/dataService";
import { server } from "../../../backend/server";

describe("Test all book api endpoints", () => {
    const masha = new User("Masha", "NotMasha", "DefinitelyNotMasha");
    const mashasBook = new Book("MashasTitle", "MashasDescription", masha, "https://masha.com", 200);

    const marton = new User("Marton", "NotMarton", "DefinitelyNotMarton");
    const martonsBook = new Book("MartonsTitle", "MartonsDescription", marton, "https://marton.com", 200);

    beforeAll(async () => {
        DataService.saveUser(masha);
        DataService.saveBook(mashasBook);
        DataService.saveUser(marton);
        DataService.saveBook(martonsBook);
    })

    afterAll(async () => {
        /**
         * Close the server instance after each test
         */
        DataService.deleteAllBooks();
        DataService.deleteAllUsers();
        await server.close()
    })

    it("get all books", async () => {
        const resJson = await request(server).get("/books").set("Content-Type", "application/json");
        expect(resJson.statusCode).toBe(200);
        expect(resJson.body).toEqual([mashasBook, martonsBook]);

        const resXml = await request(server).get("/books").set("Content-Type", "text/xml");
        expect(resXml.statusCode).toBe(200);
        expect(resXml.text).toEqual(xml(JSON.stringify([mashasBook, martonsBook])));

        const resNoContentType = await request(server).get("/books");
        expect(resNoContentType.statusCode).toBe(400);
    });

    it("get all books filters", async () => {
        const resFirst = await request(server).get("/books").query({ title: 'MartonsTitle' }).set("Content-Type", "application/json");
        expect(resFirst.statusCode).toBe(200);
        expect(resFirst.body).toEqual([martonsBook]);

        const resSecond = await request(server).get("/books").query({ description: 'MashasDescription' }).set("Content-Type", "application/json");
        expect(resSecond.statusCode).toBe(200);
        expect(resSecond.body).toEqual([mashasBook]);
    });

    it("get book detail", async () => {
        const res = await request(server).get(`/books/${mashasBook.id}`).set("Content-Type", "application/json");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(mashasBook);

    });

    it("can't get book detail with wrong id ", async () => {
        const res = await request(server).get(`/books/${"notAnId"}`).set("Content-Type", "application/json");
        expect(res.statusCode).toBe(404);
    });

});
