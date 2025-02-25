import { Resend } from "resend";
import Logger from "../utils/winstonLogger";
import { Context } from "hono";
import * as crypto from "node:crypto";
import * as nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sankitdev.official@gmail.com",
    pass: "zyzj uehv nezr nlxj", // Use App Password if 2FA is enabled
  },
});
const sendEmail = async (
  c: Context,
  to: string,
  token: string,
  tokenLink: string
) => {
  try {
    const response = await transporter.sendMail({
      from: "sankitdev.official@gmail.com",
      to,
      subject: "Verify your email",
      html: `<div>
<p>${token}<p>
<a href=${tokenLink}>Link</a>
</div>`,
    });
    return c.json({ response });
  } catch (error) {
    Logger.error("Error:", error);
    return c.json({ success: false, message: (error as Error).message }, 500);
  }
};

const generateVerificationToken = async () => {
  try {
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const tokenCode = crypto.randomBytes(3).toString("hex");
    const verificationCode = parseInt(tokenCode, 16)
      .toString()
      .slice(0, 6)
      .padStart(6, "0");
    const verificationLink = `http://localhost:3000/auth/verify?token=${verificationToken}`;
    return { verificationCode, verificationLink, verificationToken };
  } catch (err) {
    console.error("crypto support is disabled!");
    throw new Error("Failed to generate verification token");
  }
};

export { sendEmail, generateVerificationToken };
