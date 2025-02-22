import { ObjectId } from "mongoose";

const generateVerificationToken = async (userId: ObjectId) => {
  let crypto;
  try {
    crypto = await import("node:crypto");
    const tokenCode = crypto.randomBytes(3).toString("hex");
    const verificationCode = parseInt(tokenCode, 16)
      .toString()
      .slice(0, 6)
      .padStart(6, "0");
    const verificationLink = `https://localhost:3000/verify?token=${userId}`;
  } catch (err) {
    console.error("crypto support is disabled!");
  }
};

export default generateVerificationToken;
