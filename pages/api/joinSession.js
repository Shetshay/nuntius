// pages/api/joinSession.js

import { MongoClient, ObjectId } from "mongodb";

async function joinSession(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { sessionId } = req.body;

  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db("yourDatabaseName"); // Replace with your actual database name
    const sessions = db.collection("sessions");

    const session = await sessions.findOne({ _id: new ObjectId(sessionId) });

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.status(200).json(session); // Or any other appropriate response
  } catch (error) {
    console.error("Failed to join session:", error);
    res.status(500).json({ message: "Failed to join session" });
  }
}

export default joinSession;
