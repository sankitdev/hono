import { asyncHandler } from "../helper/async";
import {
  type ITransaction,
  TransactionModel,
} from "../schema/transactionModel";
import { BaseService } from "../services/base.service";
import {
  createTransactionSchema,
  updateTransactionSchema,
} from "../validation/transaction";

const transactionService = new BaseService<ITransaction>(TransactionModel);
const getTransaction = asyncHandler(async (c) => {
  const userId = c.get("userId");
  const trans = await transactionService.findAll({ userId });
  if (trans.length === 0) return c.json([]);
  return c.json({ transaction: trans });
});
const createTransaction = asyncHandler(async (c) => {
  const body = await c.req.json();
  const parsed = createTransactionSchema.parse(body);
  const trans = await transactionService.create(parsed);
  return c.json({ trans });
});

const updateTransaction = asyncHandler(async (c) => {
  const userId = c.get("userId");
  const body = await c.req.json();
  const parsed = updateTransactionSchema.parse(body);
  const updateTrans = await transactionService.update(userId, parsed);
  return c.json({ message: "Updated", updateTrans });
});
const deleteTransaction = asyncHandler(async (c) => {
  const userId = c.get("userId");
  await transactionService.delete(userId);
  return c.json({ success: true });
});
export {
  createTransaction,
  updateTransaction,
  getTransaction,
  deleteTransaction,
};
