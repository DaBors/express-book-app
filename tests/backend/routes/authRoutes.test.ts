import request from "supertest";
import User from "../../../backend/api/models/user";
import { DataService } from "../../../backend/api/services/dataService";
import { app } from "../../../backend/app";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";

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
        const token = res.body.token;
        const jwt = jsonwebtoken.verify(token, process.env.JWT_SECRET ?? "topSecretJwt") as JwtPayload;
        expect(jwt.id).toBe(masha.id)
    });

    it("get jwt with wrong password", async () => {
        const res = await request(app).post("/auth/authenticate").set("Content-Type", "application/json").send({
            username: "Masha",
            password: "BadPassword"
        });
        expect(res.statusCode).toBe(404);
    });

});