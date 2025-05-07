import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from "mongoose";

let mongod : MongoMemoryServer;

export async function setupTestDB() {
  mongod = await MongoMemoryServer.create();

  // const uri = mongod.getUri();
  // await mongoose.connect(uri)

  console.log(`Connected to in-memory MongoDB server at`);
  
  // return uri;
}

export async function teardownTestDB() {
  await mongoose.disconnect();
  await mongod.stop();

  console.log("Disconnected from in-memory MongoDB server");
}

export async function clearDatabase() {
  if(mongoose.connection.readyState === 0) {
    throw new Error("Database not connected. Call setupTestDB first"); 
  }

  const collections = mongoose.connection.collections;

  for (const key in collections){
    const collection = collections[key];
    await collection.deleteMany({});
  }

  console.log("All collections cleared");
}