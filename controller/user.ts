import { BaseService } from "../services/base.service";
import { UserModel, type IUser } from "../schema/user.model";
import { asyncHandler } from "../helper/async";
import { password } from "bun";
import { createUserSchema, updateUserSchema } from "../validation/user";
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
  });
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

export { createUser, getUser, deleteUser, updateUser };
