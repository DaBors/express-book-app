import request, { Response } from "supertest";
import User from "../../../backend/api/models/user";
import { DataService } from "../../../backend/api/services/dataService";
import { app } from "../../../backend/app";
import jsonwebtoken, { JwtPayload } from "jsonwebtoken";

describe("Test auth endpoints", () => {
    const masha: User = new User("Masha", "NotMasha", "DefinitelyNotMasha");

    beforeAll(async () => {
        /**
         * Add user to test db
         */
        DataService.saveUser(masha);
    })

    afterAll(async () => {
        /**
         * Delete user from test db
         */
        DataService.deleteAllUsers();
    })

    it("get jwt", async () => {
        const res: Response = await request(app).post("/auth/authenticate").set("Content-Type", "application/json").send({
            username: "Masha",
            password: "NotMasha"
        });
        expect(res.statusCode).toBe(200);
        const token: string = res.body.token;
        const jwt: JwtPayload = jsonwebtoken.verify(token, process.env.JWT_SECRET ?? "topSecretJwt") as JwtPayload;
        expect(jwt.userId).toBe(masha.id)
    });

    it("get jwt with wrong password", async () => {
        const res: Response = await request(app).post("/auth/authenticate").set("Content-Type", "application/json").send({
            username: "Masha",
            password: "BadPassword"
        });
        expect(res.statusCode).toBe(401);
    });

});