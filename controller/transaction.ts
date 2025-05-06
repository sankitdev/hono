import { asyncHandler } from "../helper/async";
import {
  type ITransaction,
  TransactionModel,
} from "../schema/transaction.model";
import { BaseService } from "../services/base.service";
import { HTTP_STATUS } from "../utils/response/responseCodes";
import { RESPONSE_MESSAGES } from "../utils/response/responseMessages";
import {
  createTransactionSchema,
  updateTransactionSchema,
} from "../validation/transaction";

const transactionService = new BaseService<ITransaction>(TransactionModel);

const getTransaction = asyncHandler(async (c) => {
  const userId = c.get("userId");
  const transactions = await transactionService.findAll({ userId });
  if (transactions.length === 0) return c.json([]);
  return c.json({message: "Transactions", transactions }, HTTP_STATUS.OK);
});

const createTransaction = asyncHandler(async (c) => {
  const body = await c.req.json();
  const parsed = createTransactionSchema.parse(body);
  const transaction = await transactionService.create(parsed);
  return c.json({message:RESPONSE_MESSAGES.TRANSACTION.CREATED, transaction }, HTTP_STATUS.CREATED);
});

const updateTransaction = asyncHandler(async (c) => {
  const userId = c.get("userId");
  const body = await c.req.json();
  const parsed = updateTransactionSchema.parse(body);
  const updateTrans = await transactionService.update(userId, parsed);
  return c.json({ message: RESPONSE_MESSAGES.TRANSACTION.UPDATED, updateTrans }, HTTP_STATUS.OK);
});

const deleteTransaction = asyncHandler(async (c) => {
  const userId = c.get("userId");
  await transactionService.delete(userId);
  return c.json({ success: true }, HTTP_STATUS.OK);
});

export {
  createTransaction,
  updateTransaction,
  getTransaction,
  deleteTransaction,
};
