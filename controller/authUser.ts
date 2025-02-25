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
const verifyLoginUserWithLink = asyncHandler(async (c) => {
  const token = c.req.query("token");
  if (!token) return c.json({ message: "No Token found" });
  const user = await userService.findOne({ verificationToken: token });
  if (!user) return c.json({ message: "Token Expired" });
  if (user.isVerified)
    return c.json({
      message: `Congrats you ${user.firstName} are already verified`,
    });
  user.isVerified = true;
  user.verificationExpires = null;
  await user.save();
  return c.json({
    success: true,
    message: `Congrats ${user.userName} now you can login`,
  });
});

const verifyLoginUserWithOTP = asyncHandler(async (c) => {
  const userId = c.req.param("userId");
  const { emailOtp } = await c.req.json();
  const user = await userService.findOne({ _id: userId });
  if (!user) return c.json({ message: "Something wrong" }, 403);
  console.log(user);
  if (user.verificationCode === emailOtp) {
    user.isVerified = true; // Set the verification status
    user.verificationExpires = null;
    await user.save();
    return c.json({
      message: `Congrate ${user.firstName} you are now verified. You can login Now`,
    });
  } else {
    return c.json({ message: "Wrong Code Entered." });
  }
});
export {
  loginUser,
  logoutUser,
  verifyLoginUserWithLink,
  verifyLoginUserWithOTP,
};
