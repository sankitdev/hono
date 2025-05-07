import { Hono } from "hono";
import transactionRoute from "./transaction";
import userRoute from "./user";
import authRoute from "./authRoute";
import authorizedUser from "../middleware/auth";

const router = new Hono();

router.use("/transaction/*", authorizedUser);
router.route("/auth", authRoute);
router.route("/user", userRoute);
router.route("/transaction", transactionRoute);

export default router;
