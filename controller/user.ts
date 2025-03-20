import { hashPassword } from "./../utils/hashPassword";
import { BaseService } from "../services/base.service";
import { UserModel, type IUser } from "../schema/user.model";
import { asyncHandler } from "../helper/async";
import { createUserSchema, updateUserSchema } from "../validation/user";
import {
  generateVerificationToken,
  sendEmail,
  sendVerificationEmail,
} from "../services/email.service";
import { HTTP_STATUS } from "../utils/response/responseCodes";
import { RESPONSE_MESSAGES } from "../utils/response/responseMessages";
import { validateRequest } from "../validation/validateRequest";
const userService = new BaseService<IUser>(UserModel);

const registerUser = asyncHandler(async (c) => {
  const body = await c.req.json();
  const parsedBody = validateRequest(createUserSchema, body);
  const hashPass = await hashPassword(parsedBody.password);
  const user = await userService.create({
    ...parsedBody,
    password: hashPass,
  });
  sendVerificationEmail(c, user);
  return c.json(
    {
      message: RESPONSE_MESSAGES.USER.CREATED,
      data: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    },
    HTTP_STATUS.CREATED
  );
});

const getUser = asyncHandler(async (c) => {
  const users = await userService.findAll();
  return c.json({ message: "Users", data: users });
});

const updateUser = asyncHandler(async (c) => {
  const id = c.req.param;
  const body = await c.req.json();
  const parsedBody = validateRequest(updateUserSchema, body);
  const updatedUser = await userService.update(id, parsedBody);
  if (!updatedUser)
    return c.json(
      { message: RESPONSE_MESSAGES.USER.NOT_FOUND },
      HTTP_STATUS.NOT_FOUND
    );
  return c.json(
    { message: RESPONSE_MESSAGES.USER.UPDATED, updatedUser },
    HTTP_STATUS.OK
  );
});
const deleteUser = asyncHandler(async (c) => {
  const id = c.req.param;
  const isDeleted = await userService.delete(id);
  if (!isDeleted)
    return c.json(
      { message: RESPONSE_MESSAGES.USER.NOT_FOUND },
      HTTP_STATUS.NOT_FOUND
    );
  return c.json({ message: RESPONSE_MESSAGES.USER.DELETED }, HTTP_STATUS.OK);
});

export { registerUser, getUser, deleteUser, updateUser };
