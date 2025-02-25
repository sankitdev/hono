import { ContentfulStatusCode } from "hono/utils/http-status";

export const HTTP_STATUS: Record<string, ContentfulStatusCode> = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
