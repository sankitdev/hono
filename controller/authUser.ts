import { asyncHandler } from "../helper/async";
import { IUser, UserModel } from "../schema/userModel";
import { BaseService } from "../services/base.service";
import { createSession, removeSession } from "../services/session.service";

const userService = new BaseService<IUser>(UserModel);

const loginUser = asyncHandler(async (c) => {
  const { email, password } = await c.req.json();
  const user = await userService.findOne({ email });
  if (!user) return c.json({ message: "User not found" }, 404);
  const passCheck = await Bun.password.verify(password, user?.password!);
  if (!passCheck) return c.json({ message: "Not authorized" }, 401);
  const { sessionId } = await createSession(c, user.id);
  return c.json({ message: "Session Created", sessionId });
});

const logoutUser = asyncHandler(async (c) => {
  return await removeSession(c);
});

export { loginUser, logoutUser };
