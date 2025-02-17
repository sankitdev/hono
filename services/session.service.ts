import { getConnInfo } from "hono/bun";
import { SessionModel } from "../schema/sessionModel";
import { Context } from "hono";
import { IUser } from "../schema/userModel";
import { UAParser } from "ua-parser-js";
export const createSession = async (c: Context, userId: IUser) => {
  const userAgentString = c.req.header("User-Agent") || "Unknown";
  const parser = new UAParser(userAgentString);
  const deviceInfo = {
    browser: parser.getBrowser().name || "Unknown",
    os: parser.getOS().name || "Unkown",
    device: parser.getDevice().model || "Unknown",
  };
  await SessionModel.deleteMany({ userId });
  const sessionId = crypto.randomUUID();
  await SessionModel.create({
    sessionId,
    userId,
    expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    ipAddress: getConnInfo(c).remote.address,
    userAgent: userAgentString,
    deviceInfo,
  });
  c.header(
    "Set-Cookie",
    `sessiionId=${sessionId}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600`
  );
  return { sessionId };
};
