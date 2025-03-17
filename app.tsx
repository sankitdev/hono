import { Hono } from "hono";
import { logger } from "hono/logger";
import connectDB from "./db/dbConnect";
import router from "./routers";
import { HTTP_STATUS } from "./utils/response/responseCodes";

const app = new Hono();

app.use(logger());
app.route("/", router);
app.get("/", (c) => {
  return c.text("Welcome Onboard.. Working on UI");
});
app.notFound((c) => c.json({ message: "Not Found", ok: false }, HTTP_STATUS.NOT_FOUND));
const startServer = async () => {
  await connectDB();
};

startServer();

export default {
  port: 3000,
  fetch: app.fetch,
};
