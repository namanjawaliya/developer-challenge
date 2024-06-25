import mongoose from "mongoose";

let cachedClient: mongoose.Mongoose | null = null;
let cachedDb: mongoose.Connection | null = null;

const connectToMongoDB = async () => {
  try {
    // If already connected, return cached instances
    if (cachedClient && cachedDb) {
      return { client: cachedClient, db: cachedDb };
    }

    // Use a separate variable for the MongoDB URI for clarity
    const uri = process.env.DB_CONN_STRING;
    if (!uri) {
      throw new Error(
        "MongoDB URI is not defined in the environment variables."
      );
    }

    // Configuration options for mongoose.connect()
    const dbOptions = {
      dbName: process.env.DB_NAME,
    };

    // Connect to MongoDB using Mongoose
    const client = await mongoose.connect(uri, dbOptions);

    // Cache the connected client and database
    cachedClient = client;
    cachedDb = client.connection;

    return { client, db: client.connection };
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
};

export default connectToMongoDB;
