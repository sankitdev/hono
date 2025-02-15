interface IConfig {
  DBURL: string;
  PORT: number | string;
  JWT_SECRET_KEY: string;
}
console.log(process.env.DB_URL);
const config: IConfig = {
  DBURL: process.env.DB_URL as string,
  PORT: process.env.PORT ?? 5000,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY as string,
};

export default config;
