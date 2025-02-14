import { Schema, Types, model } from "mongoose";

interface ITransaction {
  amount: number;
  type: ["credit_card", "debit_card"];
  date: string;
  userId: Schema.Types.ObjectId;
}

const transactionSchema = new Schema<ITransaction>({
  amount: { type: Number, required: true },
  type: { type: [String], enum: ["credit_card", "debit_card"], required: true },
  date: { type: String, required: true },
  userId: { type: Types.ObjectId, ref: "User" },
});

export const Transaction = model<ITransaction>(
  "Transaction",
  transactionSchema
);
