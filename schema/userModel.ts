import { Document, Model, Schema, Types, model } from "mongoose";

interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  status: "active" | "suspended" | "banned";
  suspendedUntil?: Date | null;
  password: string;
  avatar?: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["active", "suspended", "banned"],
      default: "active",
    },
    suspendedUntil: { type: Date, default: null },
    password: { type: String, required: true },
    avatar: String,
  },
  { strict: "throw", timestamps: true }
);
const UserModel: Model<IUser> = model<IUser>("User", userSchema);
export { IUser, UserModel };
