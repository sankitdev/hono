import { model, Schema, Types } from "mongoose";

interface ISession {
  sessionId: string;
  userId: Schema.Types.ObjectId;
  expiresAt: Date;
  ipAddress: string;
  userAgent: string;
}

const sessionSchema = new Schema<ISession>(
  {
    sessionId: { type: String, required: true, unique: true },
    userId: { type: Types.ObjectId, required: true, ref: "User" },
    expiresAt: { type: Date, required: true, index: { expires: "1m" } },
    ipAddress: { type: String, required: true },
    userAgent: { type: String, required: true },
  },
  { timestamps: true }
);

export const Session = model<ISession>("Session", sessionSchema);
