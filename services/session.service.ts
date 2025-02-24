import { getConnInfo } from "hono/bun";
import { SessionModel } from "../schema/session.model";
import { Context } from "hono";
import { IUser } from "../schema/user.model";
import { UAParser } from "ua-parser-js";
import Logger from "../utils/winstonLogger";
import { asyncHandler } from "../helper/async";

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
  const sessionId = crypto.randomUUID();
  try {
    await SessionModel.create({
      sessionId,
      userId,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      ipAddress,
      userAgent: userAgentString,
      deviceInfo,
    });
  } catch (error) {
    Logger.error("Error creating session:", error);
    throw new Error("Session creation failed");
  }
  c.header(
    "Set-Cookie",
    `sessionId=${sessionId}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600`
  );
  return { sessionId };
};

export const removeSession = async (c: Context) => {
  const sessionId = c.req.header("Cookie")?.split("=")[1];
  if (!sessionId) return c.json({ message: "No active session" }, 401);
  // get IP Address, User Agent
  const ipAddress = getClientIP(c);
  const userAgent = c.req.header("User-Agent") || "Unknown";
  // match this and delete
  const deleteSession = await SessionModel.findOneAndDelete({
    sessionId,
    ipAddress,
    // userAgent, : for now commenting because of issues
  });
  if (!deleteSession)
    return c.json(
      {
        message: "Session not found",
        data: { ipAddress, userAgent, sessionId },
      },
      404
    );
  c.header(
    "Set-Cookie",
    "sessionId=; HttpOnly; Secure; SameSite=Strict;Path=/; Max-Age=0"
  );
  return c.json({ message: "Logged out successfully" });
};
