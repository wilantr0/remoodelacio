// lib/mongodb.js
import { MongoClient, GridFSBucket } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
let db;
let bucket;

async function initializeMongo() {
  if (!client.isConnected()) await client.connect();
  db = client.db(process.env.MONGODB_DB);
  bucket = new GridFSBucket(db, { bucketName: "uploads" });
}

await initializeMongo();

export { db, bucket };
