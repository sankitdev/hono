interface IConfig {
  env: string;
  DBURL: string;
  isProduction: boolean;
  PORT: number;
  JWT_SECRET_KEY: string;
  logLevel: string;
  EMAIL_ADDRESS: string;
  EMAIL_APP_PASSWORD: string;
}

const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key];
  if (!value && defaultValue === undefined) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return (value ?? defaultValue) as string;
};

const ENV = process.env.BUN_ENV;

const config: IConfig = {
  env: ENV as string,
  isProduction: ENV === "production",
  DBURL: getEnv("DB_URL"),
  PORT: Number(getEnv("PORT", "5000")),
  JWT_SECRET_KEY: getEnv("JWT_SECRET_KEY"),
  logLevel: getEnv("LOG_LEVEL") || (ENV === "production" ? "info" : "debug"),
  EMAIL_ADDRESS: getEnv("EMAIL_ADDRESS"),
  EMAIL_APP_PASSWORD: getEnv("EMAIL_APP_PASSWORD"),
};

export default config;
