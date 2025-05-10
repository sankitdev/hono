import { ZodSchema } from "zod";
import { HTTP_STATUS } from "../utils/response/responseCodes";
import { HTTPException } from "hono/http-exception";

export const validateRequest = <T>(schema: ZodSchema<T>, body: unknown) => {
  const validationResult = schema.safeParse(body);

  if (!validationResult.success) {
    const formattedErrors = validationResult.error.errors.map(error => ({
      field: error.path.join("."),
      message: error.message,
    }));

    const errorMessage = formattedErrors
      .map(err => `${err.message}`)
      .join(", ");

    throw new HTTPException(HTTP_STATUS.BAD_REQUEST, {
      message: errorMessage,
    });
  }

  return validationResult.data;
};
