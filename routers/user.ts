import { Hono } from "hono";
import {
  registerUser,
  deleteUser,
  getUser,
  updateUser,
} from "../controller/user";

const userRoute = new Hono();

userRoute.get("/", getUser);
userRoute.post("/register", registerUser);
userRoute.patch("/:id", updateUser);
userRoute.delete("/:id", deleteUser);

export default userRoute;
