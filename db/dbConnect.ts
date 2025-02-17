import mongoose from "mongoose";
import config from "../config";
import Logger from "../utils/winstonLogger";

const connectDB = async () => {
  try {
    const db = await mongoose.connect(config.DBURL);
    if (db) {
      Logger.info("Connected to DataBase");
    }
  } catch (error) {
    Logger.error("Error connecting Database", error);
    process.exit();
  }
};

export default connectDB;
