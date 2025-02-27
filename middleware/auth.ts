import { Context, Next } from "hono";
import { ISession, SessionModel } from "../schema/session.model";
import { BaseService } from "../services/base.service";
const sessionService = new BaseService<ISession>(SessionModel);
const authorizedUser = async (c: Context, next: Next) => {
  try {
    const sessionId = c.req.header("Cookie")?.split("=")[1];
    if (!sessionId) return c.json({ message: "Please Login" }, 401);
    const session = await sessionService.findOne({ sessionId });
    if (!session) return c.json({ message: "No active session" }, 401);
    const userId = session.userId.toString();
    c.set("userId", userId); // attaching to context
    await next();
  } catch (error) {
    return c.json({ success: false, message: (error as Error).message }, 500);
  }
};

export default authorizedUser;
