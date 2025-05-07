import { Hono } from "hono";
import {
  createTransaction,
  deleteTransaction,
  getTransaction,
  updateTransaction,
} from "../controller/transaction";

const transactionRoute = new Hono();

transactionRoute.get("/", getTransaction);
transactionRoute.post("/", createTransaction);
transactionRoute.patch("/", updateTransaction);
transactionRoute.delete("/", deleteTransaction);

export default transactionRoute;
