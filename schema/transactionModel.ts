import { Document, Model, Schema, Types, model } from "mongoose";

interface ITransaction extends Document {
  _id: Schema.Types.ObjectId;
  amount: number;
  type: "credit_card" | "debit_card";
  date: Date;
  userId: Types.ObjectId;
}

const transactionSchema = new Schema<ITransaction>(
  {
    amount: { type: Number, required: true },
    type: {
      type: String,
      enum: ["credit_card", "debit_card"],
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { strict: "throw", timestamps: true }
);

const TransactionModel: Model<ITransaction> = model<ITransaction>(
  "Transaction",
  transactionSchema
);

export { TransactionModel, ITransaction };
