import { BaseService } from "../services/base.service";
import { UserModel, type IUser } from "../schema/userModel";
import { asyncHandler } from "../helper/async";
import { password } from "bun";
import { createUserSchema, updateUserSchema } from "../validation/user";
import { createSession } from "../services/session.service";
const userService = new BaseService<IUser>(UserModel);

const createUser = asyncHandler(async (c) => {
  const body = await c.req.json();
  const parsedBody = createUserSchema.parse(body);
  const hashPass = await password.hash(parsedBody.password, {
    algorithm: "argon2d",
    memoryCost: 4,
    timeCost: 5,
  });
  const newUser = await userService.create({
    ...parsedBody,
    password: hashPass,
  } as IUser);
  return c.json({ success: true, data: newUser }, 201);
});

const getUser = asyncHandler(async (c) => {
  const users = await userService.findAll();
  return c.json({ success: true, data: users });
});

const updateUser = asyncHandler(async (c) => {
  const id = c.req.param;
  const body = await c.req.json();
  const parsedBody = updateUserSchema.parse(body);
  const updatedUser = await userService.update(id, parsedBody);
  return c.json({ success: true, data: updatedUser });
});
const deleteUser = asyncHandler(async (c) => {
  const id = c.req.param;
  await userService.delete(id);
  return c.json({ success: true });
});

const loginUser = asyncHandler(async (c) => {
  const { email, password } = await c.req.json();
  const user = await userService.findOne({ email });
  if (!user) return c.json({ message: "User not found" }, 404);
  const passCheck = await Bun.password.verify(password, user?.password!);
  if (!passCheck) return c.json({ message: "Not authorized" }, 401);
  const { sessionId } = await createSession(c, user.id);
  return c.json({ message: "Session Created", sessionId });
});

export { createUser, getUser, deleteUser, updateUser, loginUser };
