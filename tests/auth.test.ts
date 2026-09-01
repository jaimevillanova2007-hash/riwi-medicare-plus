import request from "supertest";
import app from "../src/app";

describe("Auth API", () => {
  test("Debe permitir registrar un usuario", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: `test${Date.now()}@example.com`,
        password: "123456",
        role: "GESTOR"
      });

    expect([200, 201]).toContain(response.status);
  });
});
