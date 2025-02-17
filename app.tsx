import { Hono } from "hono";
import { logger } from "hono/logger";
import userRoute from "./routers/user";
import connectDB from "./db/dbConnect";
import { Top } from "./views/root";
const app = new Hono();
app.use(logger());

app.route("/user", userRoute);
app.get("/", (c) => {
  const messages = ["Good Morning", "Good Evening", "Good Night"];
  return c.html(<Top messages={messages} />);
});
const startServer = async () => {
  await connectDB();
};

startServer();

export default {
  port: 3000,
  fetch: app.fetch,
};
