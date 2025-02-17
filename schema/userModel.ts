import { Document, Model, Schema, model } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: String,
  },
  { strict: "throw", timestamps: true }
);
const UserModel: Model<IUser> = model<IUser>("User", userSchema);
export { IUser, UserModel };
