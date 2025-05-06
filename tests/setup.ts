import { afterAll, beforeAll } from "bun:test";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
      mongoServer = await MongoMemoryServer.create({
        instance: {
          port: 0, // Let MongoMemoryServer pick a free port
          dbName: 'test',
        },
      });
      const uri = mongoServer.getUri();
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 10000,
        ssl: false,
        retryWrites: false,
      });
      console.log(`Connected to MongoMemoryServer at ${uri}`);
  } catch (error) {
    console.error('Failed to set up MongoMemoryServer:', error);
    throw error;
  }
});

afterAll(async () => {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log("Mongoose disconnected");
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    if (mongoServer) {
      await mongoServer.stop();
      console.log("MongoMemoryServer stopped");
    }
  } catch (error) {
    console.error("Error during cleanup:", error);
    throw error;
  }
});
