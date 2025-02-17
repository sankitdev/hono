import { BaseService } from "../services/base.service";
import { UserModel, type IUser } from "../schema/userModel";
import { asyncHandler } from "../helper/async";

const userService = new BaseService<IUser>(UserModel);

const createUser = asyncHandler(async (c) => {
  const body = await c.req.json();
  const newUser = await userService.create(body);
  return c.json({ success: true, data: newUser }, 201);
});

const getUser = asyncHandler(async (c) => {
  const users = await userService.findAll();
  return c.json({ success: true, data: users });
});

const deleteUser = asyncHandler(async (c) => {
  const id = c.req.param;
  await userService.delete(id);
  return c.json({ success: true });
});

export { createUser, getUser, deleteUser };
