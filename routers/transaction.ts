import { Hono } from "hono";
import { createTransaction } from "../controller/transaction";

const transactionRoute = new Hono();

transactionRoute.post("/", createTransaction);
export default transactionRoute;
