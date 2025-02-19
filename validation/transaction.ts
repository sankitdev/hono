import { Types } from "mongoose";
import { z } from "zod";
const objectIdShcema = z
  .string()
  .refine((val) => Types.ObjectId.isValid(val))
  .transform((val) => new Types.ObjectId(val));
const createTransactionSchema = z.object({
  amount: z
    .number()
    .positive()
    .min(1, "Minimum value must be 1")
    .max(10000, "Amount can't exceed 10000 dollar")
    .multipleOf(0.01, "Amount must have at most 2 decimal places"),
  type: z.enum(["credit_card", "debit_card"]),
  userId: objectIdShcema,
});

const updateTransactionSchema = createTransactionSchema.partial({
  amount: true,
});
export { createTransactionSchema, updateTransactionSchema };
