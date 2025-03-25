import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import request from "supertest";
import { createTestServer } from "../../app";

let server: any;

beforeAll(() => {
  server = createTestServer();
});

afterAll(() => {
  server.stop();
});
// Run DB setup before tests
import "../setup";

describe("Authentication E2E Tests", () => {
  let userId: string;
  let verificationToken: string;

  it("should register a new user", async () => {
    const res = await request(`http://localhost:${server.port}`)
      .post("/user/register")
      .send({
        firstName: "test",
        lastName: "testing",
        email: "test@example.com",
        userName: "testing",
        password: "testing@123",
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("userId");

    userId = res.body.userId;
    verificationToken = res.body.verificationToken;
  });

  it("should verify the user with the token", async () => {
    const res = await request(`http://localhost:${server.port}`).get(
      `/api/auth/verify-link?token=${verificationToken}`
    );

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("User verified successfully");
  });
});
