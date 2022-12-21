import request from "supertest";
import User from "../../../backend/api/models/user";
import { DataService } from "../../../backend/api/services/dataService";
import { app } from "../../../backend/app";

describe("Test auth endpoints", () => {
    const masha = new User("Masha", "NotMasha", "DefinitelyNotMasha");

    beforeAll(async () => {
        DataService.saveUser(masha);
    })

    afterAll(async () => {
        /**
         * Close the server instance after each test
         */
        DataService.deleteAllUsers();
    })

    it("get jwt", async () => {
        const res = await request(app).post("/auth/authenticate").set("Content-Type", "application/json").send({
            username: "Masha",
            password: "NotMasha"
        });
        expect(res.statusCode).toBe(200);
    });

    it("get jwt with wrong password", async () => {
        const res = await request(app).post("/auth/authenticate").set("Content-Type", "application/json").send({
            username: "Masha",
            password: "BadPassword"
        });
        expect(res.statusCode).toBe(404);
    });

});