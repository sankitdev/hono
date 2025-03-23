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
  const user = await userService.findOne({ verificationToken: token });
  if (!user)
    return c.json(
      { message: RESPONSE_MESSAGES.AUTH.TOKEN_EXPIRED },
      HTTP_STATUS.UNAUTHORIZED
    );
  if (user.isVerified)
    return c.json(
      {
        message: RESPONSE_MESSAGES.AUTH.ALREADY_VERIFIED(user.userName),
      },
      HTTP_STATUS.CONFLICT
    );
  user.isVerified = true;
  user.verificationExpires = null;
  user.verificationToken = "";
  user.verificationCode = "";
  await user.save();
  return c.json(
    {
      success: true,
      message: RESPONSE_MESSAGES.AUTH.VERIFIED_SUCCESS,
    },
    HTTP_STATUS.CREATED
  );
});

const verifyLoginUserWithOTP = asyncHandler(async (c) => {
  const userId = c.req.param("userId");
  const { emailOtp } = await c.req.json();
  const user = await userService.findOne({ _id: userId });
  if (!user)
    return c.json(
      { message: RESPONSE_MESSAGES.USER.NOT_FOUND },
      HTTP_STATUS.NOT_FOUND
    );
  if (user.isVerified)
    return c.json(
      {
        message: RESPONSE_MESSAGES.AUTH.ALREADY_VERIFIED(user.firstName),
      },
      HTTP_STATUS.CONFLICT
    );
  if (user.verificationCode === String(emailOtp)) {
    await userService.update(user._id, {
      $unset: { verificationCode: 1, verificationExpires: 1 },
      $set: { isVerified: true },
    });
    return c.json(
      {
        message: RESPONSE_MESSAGES.AUTH.VERIFIED_SUCCESS,
      },
      HTTP_STATUS.CREATED
    );
  } else {
    return c.json(
      { message: RESPONSE_MESSAGES.ERROR.VALIDATION_FAILED },
      HTTP_STATUS.BAD_REQUEST
    );
  }
});
export {
  loginUser,
  logoutUser,
  verifyLoginUserWithLink,
  verifyLoginUserWithOTP,
};
