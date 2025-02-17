import { Context, Next } from "hono";
import Logger from "../utils/winstonLogger";

export const asyncHandler = <T>(handler: (c: Context) => Promise<T>) => {
  return async (c: Context, next: Next) => {
    try {
      return await handler(c);
    } catch (error) {
      Logger.error("Error:", error);
      return c.json({ success: false, message: (error as Error).message }, 500);
    }
  };
};
