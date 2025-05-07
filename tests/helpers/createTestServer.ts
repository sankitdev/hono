import { serve } from "bun";
import app from "../../app";

export function createTestServer() {
  const server = serve({
    fetch: app.fetch,
    port: 0,
  });
  const port = (server as any).port;

  return {
    port,
    stop: () => server.stop(),
  };
}
