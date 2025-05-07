import { Context } from "hono";
import { FilterQuery } from "mongoose";
import { BaseService } from "./base.service";
import { IUser, UserModel } from "../schema/user.model";
import { RESPONSE_MESSAGES } from "../utils/response/responseMessages";
import { HTTP_STATUS } from "../utils/response/responseCodes";

const userService = new BaseService<IUser>(UserModel);

export const verifyUser = async (
  filter: FilterQuery<any>,
  verificationValue: string,
  c: Context
) => {
  const user = await userService.findOne(filter);

  if (!user) {
    return c.json(
      { message: RESPONSE_MESSAGES.AUTH.TOKEN_EXPIRED },
      HTTP_STATUS.UNAUTHORIZED
    );
  }

  if (user.isVerified) {
    return c.json(
      {
        message: RESPONSE_MESSAGES.AUTH.ALREADY_VERIFIED(user.userName),
      },
      HTTP_STATUS.CONFLICT
    );
  }

  const tokenMatch =
    String(user.verificationToken || user.verificationCode) ===
    verificationValue;

  if (!tokenMatch) {
    return c.json(
      { message: RESPONSE_MESSAGES.ERROR.VALIDATION_FAILED },
      HTTP_STATUS.BAD_REQUEST
    );
  }

  const updatedUser = await userService.update(user._id, {
    $unset: {
      verificationCode: "",
      verificationExpires: "",
      verificationToken: "",
    },
    $set: { isVerified: true },
  });

  if (!updatedUser) {
    return c.json(
      { message: "Update failed, user not found" },
      HTTP_STATUS.INTERNAL_SERVER_ERROR
    );
  }

  return c.json(
    {
      message: RESPONSE_MESSAGES.AUTH.VERIFIED_SUCCESS,
    },
    HTTP_STATUS.CREATED
  );
};
