import { Hono } from "hono";
import { createUser, deleteUser, getUser } from "../controller/user";

const userRoute = new Hono();

userRoute.get("/", getUser);
userRoute.post("/", createUser);
userRoute.delete("/:id", deleteUser);

export default userRoute;
