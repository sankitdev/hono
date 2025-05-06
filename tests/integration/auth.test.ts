import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import "../setup";
import { createTestServer } from "../helpers/createTestServer";
import request from "supertest";
import mongoose from "mongoose";

let server: any;

beforeAll(async () => {
  while (mongoose.connection.readyState !== 1) {
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  server = createTestServer();
});

afterAll(() => {
  server.stop();
});

describe("Authentication E2E Tests", () => {
  let userId: string;
  let verificationToken: string;

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
    // expect(res.body).toHaveProperty("userId");

    // userId = res.body.userId;
    // verificationToken = res.body.verificationToken;
  });

  // it("should verify the user with the token", async () => {
  //   const res = await request(`http://localhost:${server.port}`).get(
  //     `/api/auth/verify-link?token=${verificationToken}`
  //   );

  //   expect(res.status).toBe(200);
  //   expect(res.body.message).toBe("User verified successfully");
  // });
});
