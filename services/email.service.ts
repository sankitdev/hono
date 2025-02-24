import { Resend } from "resend";
import Logger from "../utils/winstonLogger";
import { Context } from "hono";
import { Types } from "mongoose";
import * as crypto from "node:crypto";
const resend = new Resend(process.env.RESEND_API);

const sendEmail = async (
  c: Context,
  to: string,
  token: string,
  tokenLink: string
) => {
  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
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

const generateVerificationToken = async (userId: Types.ObjectId) => {
  try {
    const tokenCode = crypto.randomBytes(3).toString("hex");
    const verificationCode = parseInt(tokenCode, 16)
      .toString()
      .slice(0, 6)
      .padStart(6, "0");
    console.log(verificationCode);
    const verificationLink = `https://localhost:3000/verify?token=${userId}`;
    return { verificationCode, verificationLink };
  } catch (err) {
    console.error("crypto support is disabled!");
    throw new Error("Failed to generate verification token");
  }
};

export { sendEmail, generateVerificationToken };
