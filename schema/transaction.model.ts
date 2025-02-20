import { Document, Model, Schema, Types, model } from "mongoose";

interface ITransaction extends Document {
  _id: Types.ObjectId;
  sender: Types.ObjectId | null;
  receiver: Types.ObjectId | null;
  amount: number;
  paymentType: "deposit" | "withdrawl" | "transfer" | "purchase";
  paymentMethod: "upi" | "debit_card" | "bank_transfer";
  status: "pending" | "completed" | "failed";
  transactionId: string;
}

const transactionSchema = new Schema<ITransaction>(
  {
    sender: { type: Schema.Types.ObjectId, ref: "UserAccount", required: true },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "UserAccount",
      required: true,
    },
    amount: { type: Number, required: true, min: 1 },
    paymentType: {
      type: String,
      enum: ["deposit", "withdrawl", "transfer", "purchase"],
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["upi", "debit_card", "bank_transfer"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  { strict: "throw", timestamps: true }
);

const TransactionModel: Model<ITransaction> = model<ITransaction>(
  "Transaction",
  transactionSchema
);

export { TransactionModel, ITransaction };
