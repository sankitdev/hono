import { Context } from "hono";
import Logger from "../utils/winstonLogger";
import { HTTP_STATUS } from "../utils/response/responseCodes";

export const asyncHandler = <T>(handler: (c: Context) => Promise<T>) => {
  return async (c: Context) => {
    try {
      return await handler(c);
    } catch (error) {
      Logger.error("Error:", error);
      return c.json(
        { success: false, message: (error as Error).message },
        HTTP_STATUS.INTERNAL_SERVER_ERROR
      );
    }
  };
};
