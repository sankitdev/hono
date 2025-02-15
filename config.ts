interface IConfig {
  env: string;
  DBURL: string;
  isProduction: boolean;
  PORT: number | string;
  JWT_SECRET_KEY: string;
  logLevel: string;
}
const ENV = process.env.BUN_ENV;
const config: IConfig = {
  env: ENV as string,
  isProduction: ENV === "production",
  DBURL: process.env.DB_URL as string,
  PORT: process.env.PORT ?? 5000,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY as string,
  logLevel: process.env.LOG_LEVEL || (ENV === "production" ? "info" : "debug"),
};

export default config;
