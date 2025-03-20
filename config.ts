interface IConfig {
  env: string;
  DBURL: string;
  isProduction: boolean;
  PORT: number;
  JWT_SECRET_KEY: string;
  logLevel: string;
  EMAIL_ADDRESS: string;
  EMAIL_APP_PASSWORD:string;
}

if (!process.env.DB_URL) {
  throw new Error("Missing environment variable: DB_URL");
}
if (!process.env.JWT_SECRET_KEY) {
  throw new Error("Missing environment variable: JWT_SECRET_KEY");
}
if (!process.env.EMAIL_ADDRESS) {
  throw new Error("Missing environment variable: EMAIL_ADDRESS");
}
if (!process.env.EMAIL_APP_PASSWORD) {
  throw new Error("Missing environment variable: EMAIL_APP_PASSWORD");
}

const ENV = process.env.BUN_ENV;
const config: IConfig = {
  env: ENV as string,
  isProduction: ENV === "production",
  DBURL: process.env.DB_URL as string,
  PORT: Number(process.env.PORT) ?? 5000 ,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY as string,
  logLevel: process.env.LOG_LEVEL || (ENV === "production" ? "info" : "debug"),
  EMAIL_ADDRESS: process.env.EMAIL_ADDRESS as string,
  EMAIL_APP_PASSWORD: process.env.EMAIL_APP_PASSWORD as string
};

export default config;
