import { Schema, Types, model } from "mongoose";

interface ITransaction {
  amount: number;
  type: ["credit_card", "debit_card"];
  date: string;
  userId: Schema.Types.ObjectId;
}

const transactionSchema = new Schema<ITransaction>(
  {
    amount: { type: Number, required: true },
    type: {
      type: [String],
      enum: ["credit_card", "debit_card"],
      required: true,
    },
    date: { type: String, required: true },
    userId: { type: Types.ObjectId, ref: "User" },
  },
  { strict: "throw", timestamps: true }
);

const TransactionModel = model<ITransaction>("Transaction", transactionSchema);

export { TransactionModel, ITransaction };
