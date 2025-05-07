import { model, Schema, Types, Document } from "mongoose";

interface ISession extends Document {
  sessionId: string;
  userId: Schema.Types.ObjectId;
  expiresAt: Date;
  ipAddress: string;
  userAgent: string;
  deviceInfo: {
    browser: string;
    os: string;
    device: string;
  };
}

const sessionSchema = new Schema<ISession>(
  {
    sessionId: { type: String, required: true, unique: true },
    userId: { type: Types.ObjectId, required: true, ref: "User" },
    expiresAt: { type: Date, required: true, index: { expires: "1m" } },
    ipAddress: { type: String, required: true },
    userAgent: { type: String, required: true },
    deviceInfo: {
      browser: String,
      os: String,
      device: String,
    },
  },
  { strict: "throw", timestamps: true }
);

const SessionModel = model<ISession>("Session", sessionSchema);

export { ISession, SessionModel };
