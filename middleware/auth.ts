import { asyncHandler } from "../helper/async";

const authorizedUser = asyncHandler(async (c) => {
  const sessionId = c.req.header("Cookie")?.split("=")[1];
  if (!sessionId) return c.json({ message: "No active session" }, 401);
});
