const generateEmailHtml = (
  verificationCode: string,
  verificationLink: string
) => `
  <div style="
    font-family: Arial, sans-serif;
    max-width: 600px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    background: #f9f9f9;
    text-align: center;
  ">
    <h2 style="color: #333;">Verify Your Email</h2>
    <p style="font-size: 16px; color: #666;">
      Thank you for signing up! Please use the verification code below or
      click the button to verify your email.
    </p>
    <div style="
      font-size: 22px;
      font-weight: bold;
      color: #333;
      background: #e3e3e3;
      padding: 10px;
      display: inline-block;
      border-radius: 5px;
      margin-top: 10px;
    ">
      ${verificationCode}
    </div>
    <p style="margin: 20px 0;">Or click the button below:</p>
    <a href="${verificationLink}" style="
      display: inline-block;
      padding: 12px 20px;
      font-size: 16px;
      font-weight: bold;
      color: #fff;
      background: #007BFF;
      text-decoration: none;
      border-radius: 5px;
    ">
      Verify Email
    </a>
    <p style="font-size: 14px; color: #666; margin-top: 20px;">
      If you didn't sign up for this account, please ignore this email.
    </p>
  </div>
`;

export default generateEmailHtml;
