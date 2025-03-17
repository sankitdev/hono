import { BaseService } from "../services/base.service";
import { UserModel, type IUser } from "../schema/user.model";
import { asyncHandler } from "../helper/async";
import { password } from "bun";
import { createUserSchema, updateUserSchema } from "../validation/user";
import {
  generateVerificationToken,
  sendEmail,
} from "../services/email.service";
import { HTTP_STATUS } from "../utils/response/responseCodes";
import { RESPONSE_MESSAGES } from "../utils/response/responseMessages";
import {HTTPException} from "hono/http-exception"
const userService = new BaseService<IUser>(UserModel);

const createUser = asyncHandler(async (c) => {
  const body = await c.req.json();
  const validationResult = createUserSchema.safeParse(body);
  if (!validationResult.success){
    const formattedErrors = validationResult.error.errors.map((error) => ({
      field: error.path.join("."),
      message: error.message,
    }));
    const errorMessage = formattedErrors.map(err => `${err.message}`).join(", ");
    throw new HTTPException(HTTP_STATUS.BAD_REQUEST, { message: errorMessage });
  }
  const parsedBody = validationResult.data;
  const hashPass = await password.hash(parsedBody.password, {
    algorithm: "argon2d",
    memoryCost: 4,
    timeCost: 5,
  });
  const newUser = await userService.create({
    ...parsedBody,
    password: hashPass,
  });
  const { verificationCode, verificationLink, verificationToken } =
    await generateVerificationToken();
  newUser.verificationCode = verificationCode;
  newUser.verificationToken = verificationToken;
  newUser.verificationExpires = new Date(Date.now() + 5 * 60 * 1000);
  await newUser.save();
  sendEmail(c, newUser.email, verificationCode, verificationLink);
  return c.json(
    {
      message: RESPONSE_MESSAGES.USER.CREATED,
      data: {
        id: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
    },
    HTTP_STATUS.CREATED
  );
});
const getUser = asyncHandler(async (c) => {
  const users = await userService.findAll();
  return c.json({ message:"Users", data: users });
});
const updateUser = asyncHandler(async (c) => {
  const id = c.req.param;
  const body = await c.req.json();
  const parsedBody = updateUserSchema.parse(body);
  const updatedUser = await userService.update(id, parsedBody);
  if(!updatedUser) return c.json({ message:RESPONSE_MESSAGES.USER.NOT_FOUND },HTTP_STATUS.NOT_FOUND);
  return c.json({ message:RESPONSE_MESSAGES.USER.UPDATED, updatedUser },HTTP_STATUS.OK);
});
const deleteUser = asyncHandler(async (c) => {
  const id = c.req.param;
  const isDeleted = await userService.delete(id);
  if(!isDeleted) return c.json({ message:RESPONSE_MESSAGES.USER.NOT_FOUND },HTTP_STATUS.NOT_FOUND);
  return c.json({ message:RESPONSE_MESSAGES.USER.DELETED },HTTP_STATUS.OK);
});

export { createUser, getUser, deleteUser, updateUser };
