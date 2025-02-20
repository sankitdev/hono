import { Document, model, Schema, Types } from "mongoose";

interface IUserAccount extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  accountNumber: string;
  balance: number;
  debitCard?: {
    cardNumber: string;
    cvv: number;
    expiry: Date;
  };
  upiHandle?: string;
}

const userAccountSchema = new Schema<IUserAccount>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    accountNumber: { type: String, required: true, unique: true },
    balance: { type: Number, default: 0 },
    debitCard: { cardNumber: String, cvv: Number, expires: Date },
    upiHandle: { type: String },
  },
  { timestamps: true }
);

const UserAccountModel = model<IUserAccount>("UserAccount", userAccountSchema);
export { IUserAccount, UserAccountModel };
