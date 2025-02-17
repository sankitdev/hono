import { Hono } from "hono";
import { loginUser } from "../controller/authUser";

const authRoute = new Hono();

authRoute.post("/", loginUser);
export default authRoute;
