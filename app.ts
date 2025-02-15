import { Hono } from "hono";
import { connectDB } from "./schema";
import { logger } from "hono/logger";
const app = new Hono();
app.use(logger());
app.get("/", (c) => {
  return c.json({ test: "ho rha h", message: "hello" });
});
const startServer = async () => {
  await connectDB();
  console.log("Server is starting...");
};

startServer();

export default {
  port: 3000,
  fetch: app.fetch,
};
