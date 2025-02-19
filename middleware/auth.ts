import { Context, Next } from "hono";
import { ISession, SessionModel } from "../schema/sessionModel";
import { BaseService } from "../services/base.service";
const sessionService = new BaseService<ISession>(SessionModel);
const authorizedUser = async (c: Context, next: Next) => {
  try {
    const sessionId = c.req.header("Cookie")?.split("=")[1];
    if (!sessionId) return c.json({ message: "Please Login" }, 401);
    const session = await sessionService.findOne({ sessionId });
    console.log(session);
    if (!session) return c.json({ message: "No active session" }, 401);
    const userId = session.userId.toString();
    c.set("userId", userId); // attaching to context
    await next();
  } catch (error) {
    c.json({ message: error }, 500);
  }
};

export default authorizedUser;
