import request, {Response} from "supertest";
import { app } from "../../backend/app";

describe("GET /", () => {

  it("check if server is running", async () => {
    const res: Response = await request(app).get("/");
    expect(res.statusCode).toBe(200);
  });

});
