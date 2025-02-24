import { Hono } from "hono";
import { logger } from "hono/logger";
import connectDB from "./db/dbConnect";

import router from "./routers";
const app = new Hono();
app.use(logger());
app.route("/", router);
app.get("/", (c) => {
  return c.text("Welcome Onboard.. Working on UI");
});
app.notFound((c) => c.json({ message: "Not Found", ok: false }, 404));
const startServer = async () => {
  await connectDB();
};

startServer();

export default {
  port: 3000,
  fetch: app.fetch,
};
