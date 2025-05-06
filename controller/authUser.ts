import { asyncHandler } from "../helper/async";
import { SessionModel } from "../schema/session.model";
import { IUser, UserModel } from "../schema/user.model";
import { BaseService } from "../services/base.service";
import { createSession, removeSession } from "../services/session.service";
import { verifyUser } from "../services/user.service";
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
  if (!passCheck)
    return c.json(
      { message: RESPONSE_MESSAGES.AUTH.LOGIN_FAILED },
      HTTP_STATUS.UNAUTHORIZED
    );
  const sessionCount = await SessionModel.countDocuments({ userId: user._id });
  if (sessionCount >= 2)
    return c.json(
      { message: RESPONSE_MESSAGES.SESSION.REACHED },
      HTTP_STATUS.FORBIDDEN
    );
  const { sessionId } = await createSession(c, user.id);
  return c.json(
    { message: RESPONSE_MESSAGES.AUTH.LOGIN_SUCCESS, sessionId },
    HTTP_STATUS.CREATED
  );
});

const logoutUser = asyncHandler(async (c) => {
  return await removeSession(c);
});

const verifyLoginUserWithLink = asyncHandler(async (c) => {
  const token = c.req.query("token");
  if (!token)
    return c.json(
      { message: RESPONSE_MESSAGES.AUTH.NO_TOKEN },
      HTTP_STATUS.NOT_FOUND
    );
  return verifyUser({ verificationToken: token }, token, c);
});

const verifyLoginUserWithOTP = asyncHandler(async (c) => {
  const userId = c.req.param("userId");
  const { emailOtp } = await c.req.json();
  return verifyUser({ _id: userId }, emailOtp, c);
});

export {
  loginUser,
  logoutUser,
  verifyLoginUserWithLink,
  verifyLoginUserWithOTP,
};
