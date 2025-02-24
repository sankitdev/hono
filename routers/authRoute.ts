import { Hono } from "hono";
import { loginUser, logoutUser, verifyLoginUser } from "../controller/authUser";
const authRoute = new Hono();
authRoute.post("/login", loginUser);
authRoute.post("/logout", logoutUser);
authRoute.get("/verify", verifyLoginUser);
export default authRoute;
