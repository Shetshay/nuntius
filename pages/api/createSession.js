// pages/api/createSession.js

import { MongoClient } from "mongodb";

async function createSession(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db("nuntius"); // Replace with your actual database name
    const sessions = db.collection("sessions");

    const newSession = {
      createdAt: new Date(),
      // You can add more properties as needed
    };

    const result = await sessions.insertOne(newSession);

    res.status(201).json({ sessionId: result.insertedId });
  } catch (error) {
    console.error("Failed to create session:", error);
    res.status(500).json({ message: "Failed to create session" });
  }
}

export default createSession;
