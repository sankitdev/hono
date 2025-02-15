import mongoose from "mongoose";
import { Session } from "./sessionModel";
import { Transaction } from "./transactionModel";
import { User } from "./userModel";
import config from "../config";

const connectDB = async () => {
  try {
    const db = await mongoose.connect(config.DBURL);
    if (db) {
      console.log("Connected to DataBase");
    }
  } catch (error) {
    console.error("Error connecting Database", error);
    process.exit();
  }
};

export { Session, Transaction, User, connectDB };
