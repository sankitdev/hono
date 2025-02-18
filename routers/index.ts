import { Hono } from "hono";
import transactionRoute from "./transaction";
import userRoute from "./user";
import authRoute from "./authRoute";

const router = new Hono();
router.route("/auth", authRoute);
router.route("/user", userRoute);
router.route("/transaction", transactionRoute);
export default router;
