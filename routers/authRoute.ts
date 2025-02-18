import { Hono } from "hono";
import { loginUser, logoutUser } from "../controller/authUser";
const authRoute = new Hono();
authRoute.post("/login", loginUser);
authRoute.post("/logout", logoutUser);
export default authRoute;
