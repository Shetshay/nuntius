// pages/api/chat/fetchMessages.js
const MongooseClient = require("../../lib/mongo");

export default async function handler(req, res) {
  if (req.method !== "GET") {
    // Only allow GET requests; reject others
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { roomId } = req.query;

  if (!roomId) {
    // Check if roomId is provided
    return res.status(400).json({ error: "Room ID is required" });
  }

  const client = new MongooseClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const messages = await client.fetchMessages(roomId);
    res.status(200).json({ messages: messages.messages || [] });
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
