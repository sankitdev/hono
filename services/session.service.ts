import { getConnInfo } from "hono/bun";
import { SessionModel } from "../schema/sessionModel";
import { Context } from "hono";
import { IUser } from "../schema/userModel";
export const createSession = async (c: Context, userId: IUser) => {
  await SessionModel.deleteMany({ userId });
  const sessionId = crypto.randomUUID();
  await SessionModel.create({
    sessionId,
    userId,
    expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    ipAddress: getConnInfo(c).remote.address,
    userAgent: c.req.header("User-Agent"),
  });
  c.header(
    "Set-Cookie",
    `sessiionId=${sessionId}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600`
  );
  return { sessionId };
};
