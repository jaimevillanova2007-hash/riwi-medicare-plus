import request from "supertest";
import app from "../src/app";

describe("Requests API", () => {
  test("Debe rechazar una solicitud sin autenticación", async () => {
    const response = await request(app)
      .post("/api/requests")
      .send({
        clinicId: 1,
        medicineId: 1,
        quantity: 10,
        warehouseId: 1,
        status: "PENDING"
      });

    expect(response.status).toBe(401);
  });
});
