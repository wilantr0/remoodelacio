// lib/mongodb.js
import { MongoClient, GridFSBucket } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
let db;
let bucket;
let isConnected = false; // Track connection status

async function initializeMongo() {
  if (!isConnected) {
    await client.connect();
    isConnected = true; // Set to true after successful connection
    db = client.db(process.env.MONGODB_DB);
    bucket = new GridFSBucket(db, { bucketName: "uploads" });
  }
}

// Initialize MongoDB connection
await initializeMongo();

export { db, bucket };
