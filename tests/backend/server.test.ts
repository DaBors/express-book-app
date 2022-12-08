import request from "supertest";
import server from "../../backend/server";

describe("GET /", () => {

  afterEach(async () => {
    /**
     * Close the server instance after each test
     */
    await server.close()
  })

  it("check if server is running", async () => {
    const res = await request(server).get("/");
    expect(res.statusCode).toBe(200);
  });

});
