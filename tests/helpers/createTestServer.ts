import { serve } from "bun";
import app from "../../app";
import { Server } from "../../utils/types/test";

export function createTestServer() {
  const server = serve({
    fetch: app.fetch,
    port: 0,
  }) as Server;
  const port = server.port;

  return {
    port,
    stop: () => server.stop(),
  };
}
