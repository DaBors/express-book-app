import request from "supertest";
import User from "../../../backend/api/models/user";
import { DataService } from "../../../backend/api/services/dataService";
import { server } from "../../../backend/server";

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
        await server.close()
    })

    it("get jwt", async () => {
        const res = await request(server).post("/auth/authenticate").set("Content-Type", "application/json").send({
            username: "Masha",
            password: "NotMasha"
        });
        expect(res.statusCode).toBe(200);
    });

    it("get jwt with wrong password", async () => {
        const res = await request(server).post("/auth/authenticate").set("Content-Type", "application/json").send({
            username: "Masha",
            password: "BadPassword"
        });
        expect(res.statusCode).toBe(404);
    });

});