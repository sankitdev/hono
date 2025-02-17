import { Hono } from "hono";
import { loginUser } from "../controller/user";

const authRoute = new Hono();

authRoute.post("/", loginUser);
export default authRoute;
