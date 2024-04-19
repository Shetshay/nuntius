// lib/mongodb.js
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client;
let clientPromise;

if (!uri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so the connection can be reused
  // during hot reloads, preventing connection growth during API Route usage.
  if (!global._mongoClient) {
    global._mongoClient = new MongoClient(uri, options);
    global._mongoClientPromise = global._mongoClient.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
module.exports = clientPromise;
