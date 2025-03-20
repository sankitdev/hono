import Logger from "../utils/winstonLogger";
import { Context } from "hono";
import * as crypto from "node:crypto";
import * as nodemailer from "nodemailer";
import config from "../config";
import { IUser } from "../schema/user.model";
const { EMAIL_ADDRESS, EMAIL_APP_PASSWORD } = config;
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_ADDRESS,
    pass: EMAIL_APP_PASSWORD,
  },
});
const sendEmail = async (to: string, token: string, tokenLink: string) => {
  try {
    const response = await transporter.sendMail({
      from: EMAIL_ADDRESS,
      to,
      subject: "Verify your email",
      html: `<div>
          <p>${token}<p>
          <a href=${tokenLink}>Link</a>
          </div>`,
    });
    return { success: true, response };
  } catch (error) {
    Logger.error("Error:", error);
    return { sucess: false, message: (error as Error).message };
  }
};

const generateVerificationToken = () => {
  const verificationToken = crypto.randomBytes(32).toString("hex");
  const verificationCode = crypto.randomInt(100000, 999999).toString();
  const verificationLink = `http://localhost:3000/auth/verify?token=${verificationToken}`;

  return { verificationCode, verificationLink, verificationToken };
};

export const sendVerificationEmail = async (c: Context, user: IUser) => {
  const { verificationCode, verificationLink, verificationToken } =
    generateVerificationToken();

  user.verificationCode = verificationCode;
  user.verificationToken = verificationToken;
  user.verificationExpires = new Date(Date.now() + 5 * 60 * 1000);
  await user.save();

  const emailResponse = await sendEmail(
    user.email,
    verificationCode,
    verificationLink
  );
  if (!emailResponse.success) {
    throw new Error("Failed to send verification email");
  }
};

export { sendEmail, generateVerificationToken };
