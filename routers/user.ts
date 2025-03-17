import { Hono } from "hono";
import {
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "../controller/user";

const userRoute = new Hono();

userRoute.get("/", getUser);
userRoute.post("/create", createUser);
userRoute.patch("/:id", updateUser);
userRoute.delete("/:id", deleteUser);
export default userRoute;
