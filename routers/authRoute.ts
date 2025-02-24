import { Hono } from "hono";
import {
  loginUser,
  logoutUser,
  verifyLoginUserWithLink,
  verifyLoginUserWithOTP,
} from "../controller/authUser";
const authRoute = new Hono();
authRoute.post("/login", loginUser);
authRoute.post("/logout", logoutUser);
authRoute.get("/verify", verifyLoginUserWithLink);
authRoute.post("/email-verify/:userId", verifyLoginUserWithOTP);
export default authRoute;
