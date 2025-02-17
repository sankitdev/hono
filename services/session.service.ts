import { getConnInfo } from "hono/bun";
import { SessionModel } from "../schema/sessionModel";
import { Context } from "hono";
import { IUser } from "../schema/userModel";
import { UAParser } from "ua-parser-js";

const getClientIP = (c: any): string => {
  return (
    c.req.header("X-Forwarded-For")?.split(",")[0] || // Real IP if behind a proxy
    c.req.header("CF-Connecting-IP") || // Cloudflare (if used)
    c.req.header("X-Real-IP") || // Some proxies set this
    getConnInfo(c)?.remote?.address || // Default method
    "Unknown"
  );
};

export const createSession = async (c: Context, userId: IUser) => {
  const userAgentString = c.req.header("User-Agent") || "Unknown";
  const ipAddress = getClientIP(c);
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
    ipAddress,
    userAgent: userAgentString,
    deviceInfo,
  });
  c.header(
    "Set-Cookie",
    `sessiionId=${sessionId}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600`
  );
  return { sessionId };
};
