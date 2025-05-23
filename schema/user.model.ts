import { Document, Model, Schema, Types, model } from "mongoose";

interface IUser extends Document {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  avatar?: string;
  password: string;
  twoFactor: {
    enabled: boolean;
    secret?: string;
  };
  failedLoginAttempt: number;
  lockUntil?: Date | null;
  status: "active" | "suspended" | "banned";
  suspendedUntil?: Date | null;
  role: "customer" | "admin" | "support";
  isVerified: boolean;
  verificationToken?: string;
  verificationCode?: string;
  verificationExpires?: Date | null;
  deletedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    // 🏷️ User Identity
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    userName: { type: String, required: true, unique: true },
    avatar: String,

    // 🔒 Security & Authentication
    password: { type: String, required: true, select: false },
    twoFactor: {
      enabled: { type: Boolean, default: false },
      secret: { type: String, select: false },
    },
    failedLoginAttempt: { type: Number, default: 0 },
    lockUntil: { type: Date, default: null },

    // 🏛️ Account Status
    status: {
      type: String,
      enum: ["active", "suspended", "banned"],
      default: "active",
      index: true,
    },
    role: {
      type: String,
      enum: ["customer", "admin", "support"],
      default: "customer",
      index: true,
    },
    suspendedUntil: { type: Date, default: null },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String, select: false }, //Used in sending link
    verificationCode: { type: String, select: false }, //Used in sending email Code
    verificationExpires: {
      type: Date,
      select: false,
      index: { expires: "1m" },
    },

    // 🗑️ Soft Deletion
    deletedAt: { type: Date, default: null },
  },
  { strict: "throw", timestamps: true }
);

const UserModel: Model<IUser> = model<IUser>("User", userSchema);

export { IUser, UserModel };
