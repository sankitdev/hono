import { asyncHandler } from "../helper/async";
import { SessionModel } from "../schema/session.model";
import { IUser, UserModel } from "../schema/user.model";
import { BaseService } from "../services/base.service";
import { createSession, removeSession } from "../services/session.service";
import { HTTP_STATUS } from "../utils/response/responseCodes";
import { RESPONSE_MESSAGES } from "../utils/response/responseMessages";

const userService = new BaseService<IUser>(UserModel);

const loginUser = asyncHandler(async (c) => {
  const { email, password } = await c.req.json();
  const user = await userService.findOne({ email });
  if (!user)
    return c.json(
      { message: RESPONSE_MESSAGES.USER.NOT_FOUND },
      HTTP_STATUS.NOT_FOUND
    );
  const passCheck = await Bun.password.verify(password, user.password);
  if (!passCheck) return c.json({ message: "Not authorized" }, HTTP_STATUS);
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
  if (!token) return c.json({ message: "No Token found" }, 404);
  const user = await userService.findOne({ verificationToken: token });
  if (!user) return c.json({ message: "Token Expired" }, 404);
  if (user.isVerified)
    return c.json(
      {
        message: `Congrats you ${user.firstName} are already verified`,
      },
      200
    );
  user.isVerified = true;
  user.verificationExpires = null;
  await user.save();
  return c.json(
    {
      success: true,
      message: `Congrats ${user.userName}. You are verified now you can login`,
    },
    200
  );
});

const verifyLoginUserWithOTP = asyncHandler(async (c) => {
  const userId = c.req.param("userId");
  const { emailOtp } = await c.req.json();
  const user = await userService.findOne({ _id: userId });
  if (!user) return c.json({ message: "Something wrong" }, 403);
  if (user.isVerified)
    return c.json(
      {
        message: `You are already verified`,
      },
      400
    );
  if (user.verificationCode === emailOtp) {
    user.isVerified = true; // Set the verification status
    user.verificationExpires = null;
    await user.save();
    return c.json(
      {
        message: `Congrate ${user.firstName} you are now verified. You can login Now`,
      },
      200
    );
  } else {
    return c.json({ message: "Wrong Code Entered." }, 500);
  }
});
export {
  loginUser,
  logoutUser,
  verifyLoginUserWithLink,
  verifyLoginUserWithOTP,
};
