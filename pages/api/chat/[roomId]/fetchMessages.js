// pages/api/chat/[roomId]/fetchMessages.js
import MongooseClient from "../../../../lib/mongo";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end(); // Only GET is allowed
  }

  const { roomId } = req.query;

  const client = new MongooseClient(process.env.MONGODB_URI);
  await client.connect();

  try {
    const messages = await client.fetchMessages(roomId); // Ensure this method is implemented
    res.status(200).json(messages);
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
}
