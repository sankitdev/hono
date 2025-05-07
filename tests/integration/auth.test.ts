import { describe, it, expect, beforeAll, afterAll, afterEach } from "bun:test";
import { setupTestDB, teardownTestDB, clearDatabase } from "../setup"
import { createTestServer } from "../helpers/createTestServer";
import request from "supertest";

let server: any;

beforeAll(async () => {
  await setupTestDB();
  server = createTestServer();
});

afterEach(async ()=> {
 await clearDatabase();
})

afterAll(async () => {
  await teardownTestDB()
  server.stop();
});

describe("Authentication E2E Tests", () => {

  it("should register a new user", async () => {
    const res = await request(`http://localhost:${server.port}`)
      .post("/user/register")
      .send({
        firstName: "test",
        lastName: "testing",
        email: "test3@example.com",
        userName: "testing3",
        password: "Testing@123",
      });

    expect(res.status).toBe(201);
  });
});
