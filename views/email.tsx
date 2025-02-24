import { FC } from "hono/jsx";

const Layout: FC = (props) => {
  return (
    <html>
      <head>
        <style>
          {`
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 20px;
            }
            .email-container {
              max-width: 600px;
              margin: 0 auto;
              background: #ffffff;
              border: 1px solid #dddddd;
              border-radius: 8px;
              padding: 20px;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              font-size: 24px;
              color: #333;
              margin-bottom: 20px;
            }
            .content {
              font-size: 16px;
              color: #555;
              line-height: 1.6;
            }
            .button {
              display: inline-block;
              margin: 20px 0;
              padding: 10px 20px;
              background-color: #007bff;
              color: #fff;
              text-decoration: none;
              border-radius: 5px;
            }
            .code {
              display: inline-block;
              margin: 10px 0;
              padding: 10px;
              background-color: #f8f9fa;
              border: 1px solid #ddd;
              border-radius: 5px;
              font-family: monospace;
              font-size: 18px;
              color: #333;
            }
          `}
        </style>
      </head>
      <body>{props.children}</body>
    </html>
  );
};

export const EmailTemplate: FC<{ link: string; code: string }> = (props) => {
  return (
    <Layout>
      <div class="email-container">
        <div class="header">Welcome to Our Service!</div>
        <div class="content">
          <p>
            We are excited to have you on board. Please use the button below to
            verify your account:
          </p>
          <a href={props.link} class="button">
            Verify Account
          </a>
          <p>
            If the button doesn't work, copy and paste this link into your
            browser:
          </p>
          <p>{props.link}</p>
          <p>Your verification code is:</p>
          <div class="code">{props.code}</div>
        </div>
      </div>
    </Layout>
  );
};
