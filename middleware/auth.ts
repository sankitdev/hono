import { Context, Next } from "hono";
import { ISession, SessionModel } from "../schema/session.model";
import { BaseService } from "../services/base.service";
import { HTTP_STATUS } from "../utils/response/responseCodes";
import { RESPONSE_MESSAGES } from "../utils/response/responseMessages";
const sessionService = new BaseService<ISession>(SessionModel);
const authorizedUser = async (c: Context, next: Next) => {
  try {
    const sessionId = c.req.header("Cookie")?.split("=")[1];
    if (!sessionId)
      return c.json(
        { message: RESPONSE_MESSAGES.SESSION.NOT_FOUND },
        HTTP_STATUS.UNAUTHORIZED
      );
    const session = await sessionService.findOne({ sessionId });
    if (!session)
      return c.json({ message: "No active session" }, HTTP_STATUS.UNAUTHORIZED);
    const userId = session.userId.toString();
    c.set("userId", userId); // attaching to context
    await next();
  } catch (error) {
    return c.json({ success: false, message: (error as Error).message }, 500);
  }
};

export default authorizedUser;
