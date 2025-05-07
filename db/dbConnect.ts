import mongoose from "mongoose";
import config from "../config";
import Logger from "../utils/winstonLogger";

const connectDB = async () => {
  try {
    await mongoose.connect(config.DBURL);
    Logger.info("✅ Connected to DataBase");
  } catch (error) {
    Logger.error("❌ Error connecting Database", error);
    process.exit(1);
  }
};

export default connectDB;
