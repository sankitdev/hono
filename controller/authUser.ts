import { asyncHandler } from "../helper/async";
import { SessionModel } from "../schema/session.model";
import { IUser, UserModel } from "../schema/user.model";
import { BaseService } from "../services/base.service";
import { createSession, removeSession } from "../services/session.service";

const userService = new BaseService<IUser>(UserModel);

const loginUser = asyncHandler(async (c) => {
  const { email, password } = await c.req.json();
  const user = await userService.findOne({ email });
  if (!user) return c.json({ message: "User not found" }, 404);
  const passCheck = await Bun.password.verify(password, user.password);
  if (!passCheck) return c.json({ message: "Not authorized" }, 401);
  const sessionCount = await SessionModel.countDocuments({ userId: user._id });
  if (sessionCount >= 3)
    return c.json({ message: "Please Logout from older devices" }, 403);
  const { sessionId } = await createSession(c, user.id);
  return c.json({ message: "Session Created", sessionId });
});

const logoutUser = asyncHandler(async (c) => {
  return await removeSession(c);
});
const verifyLoginUser = asyncHandler(async (c) => {
  const token = c.req.query("token");
  if (!token) return c.json({ message: "No Token found" });

  return c.json({ success: true, token });
});
export { loginUser, logoutUser, verifyLoginUser };
