import Logger from "../utils/winstonLogger";
import * as crypto from "node:crypto";
import * as nodemailer from "nodemailer";
import config from "../config";
import { IUser } from "../schema/user.model";
import generateEmailHtml from "../views/EmailTemplate";
const { EMAIL_ADDRESS, EMAIL_APP_PASSWORD } = config;
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_ADDRESS,
    pass: EMAIL_APP_PASSWORD,
  },
});
const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const response = await transporter.sendMail({
      from: EMAIL_ADDRESS,
      to,
      subject,
      html,
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

export const sendVerificationEmail = async (user: IUser) => {
  const { verificationCode, verificationLink, verificationToken } =
    generateVerificationToken();
  const emailHtml = generateEmailHtml(verificationCode, verificationLink);
  user.verificationCode = verificationCode;
  user.verificationToken = verificationToken;
  user.verificationExpires = new Date(Date.now() + 5 * 60 * 1000);
  await user.save();
  const emailResponse = await sendEmail(
    user.email,
    "Verify Your Email",
    emailHtml
  );
  if (!emailResponse.success) {
    throw new Error("Failed to send verification email");
  }
};

export { sendEmail, generateVerificationToken };
