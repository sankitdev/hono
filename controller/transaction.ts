import { asyncHandler } from "../helper/async";
import {
  type ITransaction,
  TransactionModel,
} from "../schema/transactionModel";
import { BaseService } from "../services/base.service";
import { createTransactionSchema } from "../validation/transaction";

const transactionService = new BaseService<ITransaction>(TransactionModel);

const createTransaction = asyncHandler(async (c) => {
  const body = await c.req.json();
  const parsed = createTransactionSchema.parse(body);
  const trans = await transactionService.create(parsed);
  return c.json({ trans });
});

export { createTransaction };
