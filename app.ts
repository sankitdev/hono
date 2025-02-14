import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.json({ test: "ho rha h", message: "hello" });
});

export default app;
